import nodemailer from "nodemailer";

export const registerEmail = async (datos) => {
    const { email, name, token } = datos;

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9220b8459c72e2",
          pass: "ed23264e2aa141"
        }
    });

    //Informacion del email
    const info = await transport.sendMail({
        from:'"upTask - Manage your projects" <cuentas@upTask.com>',
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
    })
}