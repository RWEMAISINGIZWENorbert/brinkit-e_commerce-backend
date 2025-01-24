import jwt from 'jsonwebtoken'
const  auth = (req,res, next) =>  {
    try{
         
         const token =  req.cookies.accessToken 
        //  || req?.header?.authorization;

         if(!token){
            return res.status(400).json({
                message : "You have to login first",
                error: true,
                success: false
            });
         }

         const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
         if(!decode) {
            return res.status(401).json({
                message: 'Anauthorized access',
                error: true,
                success: false
            });
         }
          req.userId =  decode.id
        //  console.log(decode);

       next();
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
next();
}

export default auth;