const emailService = require('./emailService');
const {generateVerificationToken, generateResetToken} = require('../utils/tokenUtils');

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

const createEmailTemplate = (title, greeting, message, buttonText, buttonLink) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f7fa;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            text-align: center;
            padding: 30px 20px 20px 20px;
            background-color: #f9ecd2;
        }
        .header img {
            max-width: 120px;
            margin-bottom: 10px;
        }
        .header h1 {
            color: #323b94;
            font-size: 26px;
            margin: 0;
        }
        .content {
            padding: 30px 20px;
            color: #555555;
        }
        .greeting {
            font-size: 18px;
            font-weight: bold;
            color: #222;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #323b94;
            text-decoration: none;
            color: white !important; 
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #252c70;
        }
        .link-container {
            background-color: #f2f2f2;
            border: 1px solid #ddd;
            border-left: 4px solid #323b94;
            border-radius: 4px;
            padding: 10px;
            margin: 20px 0;
            word-break: break-word;
            font-size: 14px;
            color: #444;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f9f9f9;
            color: #888888;
            font-size: 12px;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="cid:logo" alt="Logo de Destinos" />
            <h1>${title}</h1>
        </div>
        <div class="content">
            <p class="greeting">${greeting}</p>
            <p>${message}</p>

            <div class="button-container">
                <a href="${buttonLink}" class="button">${buttonText}</a>
            </div>

            <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
            <div class="link-container">
                ${buttonLink}
            </div>
        </div>
        <div class="footer">
            <p>Este es un correo automático. Por favor, no respondas a este mensaje.</p>
            <p>&copy; ${new Date().getFullYear()} Destinos. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
    `;
};

const sendVerificationEmail = async (subscriber) => {
    const token = generateVerificationToken(subscriber.id);
    const verificationLink = `${BACKEND_BASE_URL}/api/auth/subscribers/verify-email?token=${token}`;

    const subject = 'Verificación de correo';
    const greeting = `Hola ${subscriber.full_name}`;
    const message = `Gracias por registrarte en nuestra plataforma. Para verificar tu correo electrónico y activar tu cuenta, por favor haz clic en el botón de abajo.`;

    const html = createEmailTemplate(
        'VERIFICACIÓN DE CORREO',
        greeting,
        message,
        'Verificar mi correo',
        verificationLink
    );

    const plainText = `Hola ${subscriber.full_name},
    
Gracias por registrarte en nuestra plataforma.
Para verificar tu correo electrónico, sigue este enlace:
${verificationLink}

Este es un correo automático. Por favor no respondas a este mensaje.`;

    await emailService.sendEmail(subscriber.email, subject, {
        html: html,
        text: plainText
    });
};

const sendPasswordResetEmail = async (subscriber) => {
    const token = generateResetToken(subscriber.id);
    const resetLink = `${FRONTEND_BASE_URL}/reset-password?token=${token}`;

    const subject = 'Restablecer contraseña';
    const greeting = `Hola ${subscriber.full_name}`;
    const message = `Hemos recibido una solicitud para restablecer tu contraseña. Si no solicitaste este cambio, puedes ignorar este mensaje. Para crear una nueva contraseña, haz clic en el botón a continuación.`;

    const html = createEmailTemplate(
        'RESTABLECER CONTRASEÑA',
        greeting,
        message,
        'Restablecer contraseña',
        resetLink
    );

    const plainText = `Hola ${subscriber.full_name},
    
Hemos recibido una solicitud para restablecer tu contraseña.
Si no solicitaste este cambio, puedes ignorar este mensaje.
Para crear una nueva contraseña, sigue este enlace:
${resetLink}

Este es un correo automático. Por favor no respondas a este mensaje.`;

    await emailService.sendEmail(subscriber.email, subject, {
        html: html,
        text: plainText
    });
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};
