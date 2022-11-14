import nodemailer from "nodemailer";

export const registerEmail = async (datos) => {
    const { email, name, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Informacion del email
    const info = await transport.sendMail({
        from:'"upTask - Manage your projects" <cuentas@uptask.com>',
        to: email,
        subject: 'upTask - Confirm your account',
        text: 'Confirm your account in upTask',
        html: `
        <p>Hola ${name}. Verify your email to create your upTask account</p>
        <p>Follow this link:</p>
        <a href="${process.env.FRONTEND_URL}/confirm-account/${token}" 
            style="text-decoration: none; padding: 6px; background: #0369a1; color: #fff; font-weight: 500; border-radius: 4px;">
            Verificar email
        </a>
        <p>If you don't created this account, ignore this mail</p>
        `,
    });
}

export const resetPassword = async (datos) => {
    const { email, name, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Informacion del email
    const info = await transport.sendMail({
        from:'"upTask - Manage your projects" <cuentas@uptask.com>',
        to: email,
        subject: 'upTask - Reset passowrd',
        text: 'Reset password',
        html: `
        <p>Hi ${name}! Follow the link below to reset your password</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${token}" 
            style="text-decoration: none; padding: 6px; background: #0369a1; color: #fff; font-weight: 500; border-radius: 4px;">
            Reset password
        </a>
        <p>If you don't ask for this, ignore this mail</p>
        `,
    });
}