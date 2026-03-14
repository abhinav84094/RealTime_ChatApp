import jwt from "jsonwebtoken";

const generateToken = async (userId)=>{
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"3D"})
        return token;
    }
    catch(err){
        console.log("Error in generating token ", err.message)
    }
}


export default generateToken