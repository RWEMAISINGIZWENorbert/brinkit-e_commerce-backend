import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    userId?: string;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): Response | void | any => {
    try {
        const token = req.cookies.accessToken;
        //  || req?.header?.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'You have to login first',
                error: true,
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN as string) as { userId: string };
        if (!decoded) {
            return res.status(401).json({
                message: 'Unauthorized access',
                error: true,
                success: false,
            });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true,
            success: false,
        });
        next(error);
    }
};

export default auth;
