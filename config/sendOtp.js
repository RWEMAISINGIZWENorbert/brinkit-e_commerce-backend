import { Resend } from "resend";
import dotenv from 'dotenv';
dotenv.config();


if(!process.env.RESEND_APIKEY){
    console.log('Please provide the api key');
}

const resend = new Resend(process.env.RESEND_APIKEY);

export const sendOtp = async ({name, sendTo, subject, html}) => {
    try{
          const { data, error } = await resend.emails.send({
            from : "rintech <onboarding.resend.dev>",
            to : sendTo,
            subject: subject,
            html : html,
          })
          if(error){
            console.log(error);
          }
          return data;
    }catch(error){
        console.log(error);
    }
}