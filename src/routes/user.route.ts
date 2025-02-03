import { Router, Request, Response } from 'express';
import { registerUserController, loginController, logoutController, updateUserController, verifyEmailController, forgotPassword,} from '../controllers/user.controller';
import auth from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: uploadDir });
const userRouter = Router();

userRouter.post('/uploads', upload.single('file'), (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ error: 'File upload failed' });
        return;
    }
    res.json(req.file);
});

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', auth, logoutController);
userRouter.put('/update-user', auth, updateUserController);
userRouter.get('/otp', forgotPassword);

export default userRouter;