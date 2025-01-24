import expres from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import userRouter from './routes/user.route.js';
import auth from './middleware/auth.js';
import { updateUserController } from './controllers/user.controller.js';
dotenv.config();
const PORT = 4000 || process.env.PORT
const app = expres();
app.use(cookieParser());  
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));    

app.use(expres.json()); 

// app.get('', (req,res) => {
//     return res.json({message: 'succesful done'});
// })

app.use('/api/user/', userRouter);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`server is carried out on http://localhost:${PORT}`));
})
