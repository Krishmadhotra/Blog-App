import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch(err => {
    console.error('Connection error', err);
  });

const app=express();

app.use(express.json())

app.use(cookieParser())

app.listen(3000,()=>{
    console.log("app is running on port 100 !")
})
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/post",postRouter);
app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const errMessage=err.message ||'Internal Server Error';
    res.status(statuscode).json({
        success:false,
        statuscode,
        errMessage
    })

});