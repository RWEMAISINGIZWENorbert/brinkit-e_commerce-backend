import {Resend} from 'resend'
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.RESEND_APIKEY) {
    console.log('Please provide the Api key');
}

const resend = new Resend(process.env.RESEND_APIKEY);

const sendEmail = async({ name, sendTo, subject, html }) => {
      try{
        const { data, error } = await resend.emails.send({
            from: "Brinkit <onboarding@resend.dev>",
            to: sendTo,
            subject: subject,
            html: html
        });

        if(error){ 
            console.error(error);
        }

         return data;

      }catch(errror) {
         console.log(errror)
      }
}

export default sendEmail;