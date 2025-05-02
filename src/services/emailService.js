const nodemailer = require('nodemailer');
const path = require('path');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        this.defaultAttachment = [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '../../public/images/logo.png'),
                cid: 'logo'
            }
        ]

        if (!this.transporter) {
            console.error("Error al inicializar el transporter de Nodemailer");
        }
    }

    async sendEmail(to, subject, {html, text, attachments = []}) {
        try {
            const mailOptions = {
                from: {
                    name: 'Destinos',  // Cambia por el nombre de tu empresa
                    address: process.env.EMAIL_USER
                },
                to: to,
                subject: subject,
                headers: {'Priority': 'high'},
                html,
                text: text || html?.replace(/<[^>]*>/g, ''),
                attachments: [...this.defaultAttachment, ...attachments]
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
            return info;
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();
