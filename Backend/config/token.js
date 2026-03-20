import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
    try {
        const token = jwt.sign(
            { id: userId },   
            process.env.JWT_SECRET,
            { expiresIn: "3d" }  
        );
        return token;
    } catch (err) {
        console.log("Error in generating token ", err.message);
    }
};

export default generateToken;