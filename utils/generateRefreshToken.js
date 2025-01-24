import jwt from 'jsonwebtoken';
import userModal from '../models/user.model.js';

const generateRefreshToken = async ( userId) => {

    const user = await userModal.find({ _id: userId })
      const token = await jwt.sign(
                                           { id: userId },
                                          //  user,
                                           process.env.SECRET_KEY_REFRESH_TOKEN,
                                        {expiresIn: '5d'});       
      return token;
 const upadateRefereshToken = await userModal.updateOne({ _id: userId }, { refresh_token: token });
}

export default generateRefreshToken;