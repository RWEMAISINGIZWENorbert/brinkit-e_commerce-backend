import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    userId?: string;
}
import sendEmail from '../config/sendEmail';
import userModel from '../models/user.model';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate';
import generateAccessToken from '../utils/generateAccessToken';
import generateRefreshToken from '../utils/generateRefreshToken';
import generateOTP from '../utils/generateOTP';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}


export const uploadProfile = (req: Request, res: Response): void => {
    try {
        res.send('Uploaded successfully');
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message || error,
            error: true,
            success: false,
        });
    }
};

export const registerUserController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please enter the name, email, or password',
                error: true,
                success: false,
            });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.json({
                message: 'The email already exists',
                error: true,
                success: false,
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const payload = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(payload);
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;
        await sendEmail({
            name,
            sendTo: email,
            subject: 'Verify email from Rin Tech',
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl,
            }),
        });

        return res.status(201).json({
            message: 'User registered successfully',
            error: false,
            success: true,
            data: save,
        });
    } catch (error) {
        return res.status(400).json({
            message:  (error as Error).message || error,
            error: true,
            success: false,
        });
        next(error)
    }
};

export const verifyEmailController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { code } = req.body;
        const user = await userModel.findOne({ _id: code });

        if (!user) {
            return res.json({
                message: 'Invalid code',
                error: true,
                success: false,
            });
        }

        await userModel.updateOne({ _id: code }, { verify_email: true });

        return res.status(200).json({
            message: 'Email verified',
            error: false,
            success: true,
        });
    } catch (error) {
        return res.json({
            message:  (error as Error).message || error,
            error: true,
            success: false,
        });
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter email and password',
                error: true,
                success: false,
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email',
                error: true,
                success: false,
            });
        }

        if (user.status !== 'active') {
            return res.status(400).json({
                message: 'Your account is not active',
                error: true,
                success: false,
            });
        }

        const matchPassword = await bcryptjs.compare(password, user.password);

        if (!matchPassword) {
            return res.json({
                message: 'The password provided does not match',
                error: true,
                success: false,
            });
        }

        const accessToken = await generateAccessToken(user._id as string);
        const refreshToken = await generateRefreshToken(user._id as string);

        const corsOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'none' as const,
        };

        res.cookie('accessToken', accessToken, corsOption);
        res.cookie('refreshToken', refreshToken, corsOption);

        await userModel.findByIdAndUpdate(user._id, { refresh_token: refreshToken });

        return res.json({
            message: 'Login successfully',
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true,
            success: false,
        });
    }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        const userId = req.userId;

        const corsOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'none' as const,
        };
    
        res.clearCookie('accessToken', corsOption);
        res.clearCookie('refreshToken', corsOption);
    
        await userModel.findByIdAndUpdate(userId, { refresh_token: '' });
    
        return res.status(200).json({
            message: 'Logout successfully done',
            error: false,
            success: true,
        });
      } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true,
            success: false,
        });
      }
};

export const updateUserController = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                error: true,
                success: false,
            });
        }

        let hashedPassword = '';

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashedPassword = await bcryptjs.hash(password, salt);
        }

        await userModel.findByIdAndUpdate(userId, {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(password && { password: hashedPassword }),
        });

        res.json({
            message: 'Updated user successfully',
            error: false,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = (req: Request, res: Response, next: NextFunction): void => {
    try {
        generateOTP();
        res.status(200).json({ message: 'No error found' });
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message || error,
            error: true,
            success: false,
        });
        next(error);
    }
};