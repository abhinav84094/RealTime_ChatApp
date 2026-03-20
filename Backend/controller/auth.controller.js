import generateToken from "../config/token.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signUp = async (req , res)=>{

    try{
        const {username, email, password} = req.body ;
        console.log(req.body)
        const checkUserByUserName = await User.findOne({username});
        if(checkUserByUserName) return res.status(400).json({message:"UserName already exists, please check unique userName"});

        const checkEmail = await User.findOne({email});
        if(checkEmail) return res.status(400).json({message:"Email already exists, please select an unique email"});
    
        if(password.length<6) return res.status(400).json({message:"Password must be atleast 6 characters"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            {
                username, email, password:hashedPassword
            }
        )

        const token = await generateToken(user._id);

        res.cookie("token", token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:false
        })

        return res.status(201).json(user);

    }
    catch(err){
        res.status(500).json({message:`Error in SignUp ${err}`});
    }
}



export const logIn = async (req , res)=>{

    try{
        const {email, password} = req.body ;
        console.log(req.body)

        const user = await User.findOne({email});
        
        if(!user) return res.status(400).json({message:"User not exists, please select correct email"});
    
        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return  res.status(400).json({message:"Incorrect Password"})
        }

        const token = await generateToken(user._id);

        res.cookie("token", token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:false
        })
       
        return res.status(200).json({user});

    }
    catch(err){
        res.status(500).json({message:`Error in Login ${err}`});
    }
}


export const logOut = async (req, res)=>{
    try{
        await res.clearCookie("token")
        return res.status(200).json({message: "Log out successfully"})
    }
    catch(err){
        res.status(500).json({message:`Error in Logout ${err}`});
    }
}