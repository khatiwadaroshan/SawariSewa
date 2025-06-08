import jwt from 'jsonwebtoken'

export const generateToken = (userId,res) => {
    let token
    try{

         token = jwt.sign(
          { userId},
          process.env.JWT_KEY,

          {
            expiresIn: "4d",
          }
        );

        res.cookie("JWT",token,{
            maxAge:4*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:"processed.env.NODE_ENV!=='development"
        })

    }
    catch(error){

        console.log("token generate error",error.message);
        res.status(500).json({message:"internal server error!!"})
        

    }
    return token;
}