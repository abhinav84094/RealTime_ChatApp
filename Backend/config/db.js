import mongoose  from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB DB connected");
    }
    catch(error){
        console.log("DB not connected ", error)
    }
}

export default connectDB;