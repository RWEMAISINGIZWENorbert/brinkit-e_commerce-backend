import mongoose from "mongoose";
import dotenv  from 'dotenv';

dotenv.config();

if(!process.env.url){
    throw new Error('Please enter the url')
}

async function connectDB() {
    try{
        await mongoose.connect(process.env.url, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        .then(() => console.log('DB conected'))
    }catch(err){
        throw new Error(err);
    }
}

export default connectDB;