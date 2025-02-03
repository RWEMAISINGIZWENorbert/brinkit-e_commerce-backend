// import mongoose from "mongoose";
// import dotenv  from 'dotenv';

// dotenv.config();

// if(!process.env.url){
//     throw new Error('Please enter the url')
// }


// async function connectDB() {
//     try{
//         await mongoose.connect(process.env.mongodb_url, {
//             useNewUrlParser: true,
//             useUnifiedTopology:true,
//         })
//         .then(() => console.log('DB conected'))
//     }catch(err){
//         throw new Error(err);
//     }
// }

// export default connectDB;


import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongoDBUrl: string = process.env.MONGODB_URL as string;
if (!mongoDBUrl) {
    throw new Error('Please enter the MongoDB URL');
}

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoDBUrl);
        console.log('DB connected');
    } catch (err) {
        throw new Error(`DB connection error: ${err}`);
    }
};

export default connectDB;