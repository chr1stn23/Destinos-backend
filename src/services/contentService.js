const {Content, ContentBlock, Category, ContentType, sequelize} = require('../models/models');
const {Sequelize, Op} = require("sequelize");

const getAllContents = async (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;

    const {count, rows} = await Content.findAndCountAll({
        limit: pageSize,
        offset: offset,
        order: [['publication_date', 'DESC']],
        attributes: {
            exclude: ['category_id', 'content_type_id'] // excluimos los IDs que ya no necesitamos
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id','name']
            },
            {
                model: ContentType,
                as: 'type',
                attributes: ['id','name']
            }
        ]
    });

    return {
        data: rows,
        pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            hasNextPage: page * pageSize < count,
            hasPreviousPage: page > 1
        }
    }
}

const getContentById = async (id) => {
    return await Content.findByPk(id, {
        attributes: {
            exclude: ['category_id', 'content_type_id']
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            },
            {
                model: ContentType,
                as: 'type',
                attributes: ['id', 'name']
            },
            {
                model: ContentBlock,
                as: 'blocks',
                attributes: ['id', 'type', 'display_order', 'data'],
                separate: true,
                order: [['display_order', 'ASC']]
            }
        ]
    });
};

const getContentBySlug = async (slug) => {
    return await Content.findOne({
        where: {slug},
        attributes: {
            exclude: ['category_id', 'content_type_id']
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            },
            {
                model: ContentType,
                as: 'type',
                attributes: ['id', 'name']
            },
            {
                model: ContentBlock,
                as: 'blocks',
                attributes: ['id', 'type', 'display_order', 'data'],
                separate: true,
                order: [['display_order', 'ASC']]
            }
        ]
    })
}

const createContent = async (contentData) => {
    const transaction = await sequelize.transaction();

    try {
        const newContent = await Content.create(contentData, { transaction });

        if (contentData.blocks && Array.isArray(contentData.blocks)) {
            const blocksToCreate = contentData.blocks.map((block, index) => ({
                ...block,
                content_id: newContent.id,
                display_order: index + 1 // aseguramos display_order también
            }));

            await ContentBlock.bulkCreate(blocksToCreate, { transaction });
        }

        await transaction.commit();

        return await Content.findByPk(newContent.id, {
            attributes: {
                exclude: ['category_id', 'content_type_id']
            },
            include: [{
                model: ContentBlock,
                as: 'blocks',
                separate: true,
                order: [['display_order', 'ASC']]
            }]
        });

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const updateContent = async (id, updateData) => {
    const transaction = await sequelize.transaction();

    try {
        const existingContent = await Content.findByPk(id, {
            include: [{ model: ContentBlock, as: 'blocks' }],
            transaction
        });

        if (!existingContent) {
            await transaction.commit();
            return null;
        }

        await existingContent.update(updateData, { transaction });

        if (updateData.blocks && Array.isArray(updateData.blocks)) {
            await ContentBlock.destroy({
                where: { content_id: id },
                transaction
            });

            const blocksToCreate = updateData.blocks.map(block => ({
                ...block,
                content_id: id
            }));

            await ContentBlock.bulkCreate(blocksToCreate, { transaction });
        }

        await transaction.commit();

        return await Content.findByPk(id, {
            include: [{model: ContentBlock, as: 'blocks'}]
        });

    } catch (error) {
        if (transaction.finished !== 'commit') {
            await transaction.rollback();
        }
        throw error;
    }
};


const deleteContent = async (id) => {
    const content = await Content.findByPk(id);
    if (!content) return null;

    return await content.destroy();
}

const countByCategory = async () => {
    const results = await Content.findAll({
        attributes: [
            'category_id',
            [Sequelize.fn('COUNT', Sequelize.col('Content.id')), 'contentCount']
        ],
        include: [{
            model: Category,
            as: 'category',
            attributes: ['name']
        }],
        group: ['category.id', 'category_id'],
    });

    return results.map(r => ({
        categoryId: r.category_id,
        categoryName: r.category.name,
        count: parseInt(r.get('contentCount'))
    }));
}

const searchContents = async (query) => {
    const { q, categoryId, contentTypeId } = query;

    const where = {};

    // Búsqueda por palabra clave en título, subtítulo o autor
    if (q) {
        where[Op.or] = [
            { title: { [Op.like]: `%${q}%` } },
            { subtitle: { [Op.like]: `%${q}%` } },
            { author: { [Op.like]: `%${q}%` } }
        ];
    }

    // Filtro adicional por categoría
    if (categoryId) {
        where.category_id = categoryId;
    }

    // Filtro adicional por tipo de contenido
    if (contentTypeId) {
        where.content_type_id = contentTypeId;
    }

    return await Content.findAll({
        where,
        include: [
            {model: Category, as: 'category', attributes: ['name']},
            {model: ContentType, as: 'type', attributes: ['name']}
        ]
    });
};

module.exports = {
    getAllContents,
    getContentById,
    getContentBySlug,
    createContent,
    updateContent,
    deleteContent,
    countByCategory,
    searchContents,
}