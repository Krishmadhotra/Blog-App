import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
// import path from "path"


dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch(err => {
    console.error('Connection error', err);
  });

const app=express();

// const __dirname=path.resolve();

app.use(express.json())

app.use(cors({
  origin:'http://localhost:5173/', // Replace with your frontend's domain
  credentials: true, // Allow cookies to be sent with the requests
}));

app.use(cookieParser())

app.listen(3000,()=>{
    console.log("app is running on port 100 !")
})
app.use("/Server/user",userRoutes);
app.use("/Server/auth",authRoutes);
app.use("/Server/post",postRoutes);
app.use("/Server/comment",commentRoutes)

// app.use(express.static(path.join(__dirname,'client/dist')))

// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname,'client','dist','index.html'))
// });

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const errMessage=err.message ||'Internal Server Error';
    res.status(statuscode).json({
        success:false,
        statuscode,
        errMessage
    })

});