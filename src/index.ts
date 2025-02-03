import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/connectDB';
import userRouter from './routes/user.route';
// import auth from './middleware/auth.js';
// import { updateUserController } from './controllers/user.controller.js';

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();


app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

// app.get('', (req,res) => {
//     return res.json({message: 'succesful done'});
// })

app.use('/api/user/', userRouter);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});

// const data = async () => {
// const totalChallenges = await challengeModel.countDocuments({duration: '5 days'});
// console.log(totalChallenges);
// }
// data();

// const data = async () => {
// const totalChallenges = await challengeModel.find({duration: '5 days'}, {status: 1});
// console.log(totalChallenges);
// }
// data();