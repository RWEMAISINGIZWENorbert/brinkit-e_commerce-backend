import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_APIKEY) {
    throw new Error('Please provide the API key');
}

const resend = new Resend(process.env.RESEND_APIKEY as string);

interface SendOtpParams {
    name: string;
    sendTo: string;
    subject: string;
    html: string;
}

export const sendOtp = async ({ name, sendTo, subject, html }: SendOtpParams): Promise<any> => {
    try {
        const { data, error } = await resend.emails.send({
            from: "rintech <onboarding.resend.dev>",
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Error sending OTP:', err);
        return null;
    }
};