import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"


dotenv.config();
const port = process.env.PORT || 5000;
console.log(port)

const app = express()


app.use(cors(
    {origin:"http://localhost:5173", credentials:true}
))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRouter);


app.get("/", (req, res)=>{
    res.send({message:"This is home"})
})



app.listen(port, ()=>{
    connectDB();
    console.log("Server is running on ",{port})
})