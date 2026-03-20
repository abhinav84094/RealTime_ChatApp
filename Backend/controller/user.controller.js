import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res)=>{
    try{
        let userId = req.userId;  

        let user = await User.findById(userId).select("-password");

        if(!user) return res.status(400).json({message:"User not found"});

        return res.status(200).json({user});

    }catch(err){
        return res.status(400).json({message:`user controller error ${err}`})
    }
}


export const editProfile = async (req, res)=>{
    try{
        let {name} = req.body
        let image ;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }

        let user = await User.findByIdAndUpdate(req.userId, {
            name, image
        })

        if(!user) return res.status(400).json({message:"user not found"})
        
        console.log("Profile setup completed");

        return res.status(200).json(user);
    }
    catch(err){
        return res.status(400).json({message:`profile error ${err}`})
    }
}