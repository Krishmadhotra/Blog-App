import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import Users from '../models/user.model.js';

export const updateUser=async(req,res,next)=>{
    if(req.user.id !==req.params.userId){
       return next(error(403,"Yur are not authenticated"))
    }

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,"Password must be atleast 6 characters"))
        }

        req.body.password=bcryptjs.hashSync(req.body.password,10);
    }
    
    if(req.body.username){
            if(req.body.username.length < 7  || req.body.username.length > 20){
                return next(errorHandler(400,"Username must be between 7 and 20 characters"))
            }

            if(req.body.username.include(" ")){
                return next(errorHandler(400,"username cannot contain spaces"));
            }

            if(req.body.username !== req.body.username.toLowerCase()){
                return next(errorHandler(400,"Username must be in lower case"))
            }

            if(req.body.username.match(/^[a-zA-Z0-9]+$/)){
                return next(errorHandler(400,"username can only contains letters and numbers"))
            }

            try{
                const updatedUser=await Users.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password
                },
            },{new:true})
        }catch(error){
            next(error)
        }
    }
}
