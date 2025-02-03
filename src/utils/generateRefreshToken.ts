import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';

const generateRefreshToken = async (userId: string): Promise<string> => {
    if (!process.env.SECRET_KEY_REFRESH_TOKEN) {
        throw new Error('SECRET_KEY_REFRESH_TOKEN is not defined');
    }

    const user = await userModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const token = jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '5d' }
    );

    await userModel.updateOne({ _id: userId }, { refresh_token: token });

    return token;
};

export default generateRefreshToken;