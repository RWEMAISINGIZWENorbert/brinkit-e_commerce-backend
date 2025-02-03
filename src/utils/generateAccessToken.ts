import jwt from 'jsonwebtoken';

const generateAccessToken = async (userId: string): Promise<string> => {
    if (!process.env.SECRET_KEY_ACCESS_TOKEN) {
        throw new Error('SECRET_KEY_ACCESS_TOKEN is not defined');
    }

    const token = await jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '4h' }
    );

    return token;
};

export default generateAccessToken;