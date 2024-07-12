import Users from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup=async(req,res,next) => {
    const {username,email,password}=req.body;

    if(!username || !email || !password || username===' ' || email===' ' || password === ' '){
    
        next(errorHandler(500,"All fields are required"))
    }

    const hashedPassword= bcryptjs.hashSync(password,10)

    const newUser=new Users({
    username:username,
    email:email,
    password:hashedPassword
    })
    try{
    await newUser.save();
    res.json({message:"sucessfully signed up"})
    }catch(error){
        next(error)
    }
}

export const signin= async  (req,res,next)=>{
    const{email,password}=req.body;

    if(!email || !password  || email===" " || password===" "){
      next(errorHandler(400,"Please fill the fields"))
    }

    try{
      const validUser=await Users.findOne({email})
      if(!validUser){
        return next(errorHandler(400,"User not found"))
      }

      const validPassword=bcryptjs.compareSync(password,validUser.password);
      if(!validPassword){
        return next(errorHandler(400,"Invalid Password"))
      }

      const token=jwt.sign({
        id:validUser._id
      },process.env.JWT_SECRET
     );

     const {password:pass , ...rest}=validUser._doc

     res.status(200).cookie('access_token',token,{
      httpOnly:true
     }).json(rest)




    }
    catch(error){
      next(error)
    }

}