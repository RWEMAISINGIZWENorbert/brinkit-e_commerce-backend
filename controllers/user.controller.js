import sendEmail from "../config/sendEmail.js";
import userModal from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import verifyEmailTeplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import generateOTP from "../utils/generateOTP.js";

export const  registerUserController = async (req,res) => {
    try{
          
        const { name, email, password }  = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Please inter the name , email or password",
                error: true,
                success: false
            });
        }

        const user = await userModal.findOne({ email });

        if(user) {
            return res.json({
                message: "The email alredy exists",
                error: true,
                success: false
            });
        }
     
        const hashedPassword = await bcryptjs.hash(password, 10);
        const payload = {
            name,
            email,
            password: hashedPassword
        }
 
         const newUser = new userModal(payload);
         const save = await newUser.save();

         const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code = ${save._id}`
         const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from the rin teck",
            html: verifyEmailTeplate({
                name,
                url : verifyEmailUrl
            })
         });
         verifyEmail;
         return res.status(201).json({
            message: "User regitered successfully",
            error: false,
            success: true,
            data: save
         })
  
    }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}
 
 export const verifyEmailController = async (req,res) => {
       try{
           const { code  } = req.body;
           const user = await userModal.findOne({ _id: code});

           if(!user){
             return res.json({
                message: 'The invalid code',
                error: true,
                success: false
             });
           }
          
           const updateUser = await userModal.updateOne({_id: code}, {
              verify_email: true,
           });

           return res.status(200).json({
                    message: "Verified email",
                    error: false,
                    success: true
           });

       }catch(error){
         return res.json({
            message: error.message || error,
            error: true,
            success: false
         });
       }
}

/// The login controller ///
export const loginController = async (req,res) => {
     try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "The error",
                error: true,
                success: false
            });
        }
    
        const user = await userModal.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: 'Invalid email',
                error: true,
                success: false
            });
        }

        if(user.status !== 'active'){
            return res.status(400).json({
                message: "You Accout is not active",
                error: true,
                success: false 
            });
        }

        const matchPassword = await bcryptjs.compare(password, user.password);

        if(!matchPassword){
            return res.json({
                message: "The password provide does not match",
                error: true,
                success: false
            })
        }

        const accessToken  = await generateAccessToken(user._id);
        const refreshToken  = await generateRefreshToken(user._id);
        
        const corsOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

         res.cookie('accessToken', accessToken, corsOption);
         res.cookie('refreshToken', refreshToken, corsOption);

         await userModal.findByIdAndUpdate(user, { refresh_token: refreshToken });
         

         return res.json({
            message:'Login successfully',
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
         });
    
     }catch(error){
         return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
         });
     }
}

// The logout controler ///

export const logoutControler = async (req,res) => {
      
    const userid = req.userId
     
    const corsOption  =  {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    };
    
    res.clearCookie('accessToken', corsOption);
    res.clearCookie('refreshToken', corsOption);

    const removeRefreshToken = await userModal.findByIdAndUpdate(userid, {
         refresh_token: ''
    });

    return res.status(200).json({
        message: 'logout successfullly done',
        error: false,
        success: true
    })
}

// Update the user details controller

export const updateUserController = async (req,res, next) => {
    try{ 
        const userid = req.userId
        const { name, email, mobile, password }  = req.body

        let hashedPassword = ''

        // if(password){
        //     const salt = await bcryptjs.genSalt(10)
        //     hashedPassword = await bcryptjs.hash(password,salt)
        // }

        console.log(userid);
        // console.log(name)
        // const updateUser =  await userModal.findByIdAndUpdate(userid, {
        //     ...(name && {name: name}),
        //     ...(email && { email: email}),
        //     ...(mobile && { mobile: mobile}),
        //     ...(password && { password: hashedPassword})
        // })

        const updateData = await userModal.findByIdAndUpdate(userid, {
            name: name, 
            email: email, 
            mobile: mobile, 
            password: password
        });
        
        return res.json({
            message: "Updated user successfully",
            error: false,
            sucess: true
        })
        next();
    }catch(error){
        return res.status(500).json({
           message: error.message || error,
           error: true,
           success: false
        })
      }
}
// export default registerUserController;

export const forgotPassword = (req,res) => {
     try{
        // const { email} = req.body;
        generateOTP();
        // res.json()
        res.status(200).json({message: 'no error found'});
     }catch(error){
        return res.status(500).json({
              message: error.message || error,
              error: true,
              success: false
        })
     }
}