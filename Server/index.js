import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from "./routes/auth.route.js"

const app=express();
dotenv.config();
app.use(express.json())
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDB is connected")
})
.catch(err=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log("app is running on port 300 !")
})

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const errMessage=err.message ||'Internal Server Error';
    res.status(statuscode).json({
        success:false,
        statuscode,
        errMessage
    })

});