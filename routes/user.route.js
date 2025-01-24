import { Router } from 'express';
import { registerUserController, loginController, logoutControler, updateUserController, verifyEmailController, forgotPassword } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
const userRouter = Router();


userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', auth, logoutControler);
userRouter.put('/update-user', auth, updateUserController);
userRouter.get('/otp', forgotPassword);
export default userRouter;