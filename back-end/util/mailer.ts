import nodemailer from 'nodemailer';





const transporter = nodemailer.createTransport({


    host: process.env.SMTP_HOST,


    port: Number(process.env.SMTP_PORT),


    secure: !!process.env.SMTP_SECURE,


    auth: {


        user: process.env.SMTP_USER,


        pass: process.env.SMTP_PASS,


    },


});





export async function sendMail(opts: {


    to: string;


    subject: string;


    text?: string;


    html?: string;


}) {


    await transporter.sendMail({


        from: process.env.SMTP_FROM,


        to: opts.to,


        subject: opts.subject,


        text: opts.text,


        html: opts.html,


    });


}