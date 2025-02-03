import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_APIKEY) {
    throw new Error('Please provide the API key');
}

const resend = new Resend(process.env.RESEND_APIKEY as string);

interface SendEmailParams {
    name: string;
    sendTo: string;
    subject: string;
    html: string;
}

const sendEmail = async ({ name, sendTo, subject, html }: SendEmailParams): Promise<void> => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Brinkit <onboarding@resend.dev>",
            to: sendTo,
            subject: subject,
            html: html
        });

        if (error) {
            console.error(error);
        } else {
            console.log('Email sent successfully:', data);
        }
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

export default sendEmail;