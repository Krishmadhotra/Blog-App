import jwt from"jsonwebtoken"
import { errorHandler } from "./error.js"


export const verfiyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,"Unauthorised"));
    }

    jwt.verify(token,process.env_JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,"Unauthorised"))
        }

        req.user=user;
        next();
    })
}