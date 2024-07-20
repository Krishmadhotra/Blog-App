import { errorHandler } from "../utils/error";
import Comment from "../models/comment.model";

export const createComment=async(req,res,next)=>{
    try{

        const {content,postId,userId}=req.body;

        if(userId!==req.user.id){
            return next(errorHandler(403,"You are not authenticated to  create this comment")   )

        }
        const newComment=new Comment({
            content,
            postId,
            userId,
        })

        await newComment.save()

    }catch(error){
        next(error)
    }
},

export const getPostComments=async(req,res,next)=>{
        try{
            const comments=await Comment.find({postId:req.params.postId}).sort({createdAt:-1});

            res.status(200).json(comments);


        }catch(error){
            next(error)
        }




}

export const likeComment=async(req,res,next)=>{
    try{
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,"Comment Not found"))
        }

        const userIndex=comment.likes.findIndexOf(req.user.id)
            if(userIndex===-1){
                comment.numberOfLikes+=1 
                comment.likes.push(req.user.id)
                
            }
            else{
                comment.numberOfLikes-=1
                comment.likes.splice(userIndex,1)

            }
            await content.save();
            res.status(200).json(comment)

        }catch(error){
            next(error)
        }
    }

export const editComment=async(req,res,next)=>{
    try{
        const comment=await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404,"Comment not foumd"))
        }
    
        if(comment.userId!==req.userId && !req.user.isAdmin){

            return next(errorHandler(403,"You are not allowed to edit this comment"));
        }

        const editedComment=await Comment.findByIdAndDelete(req.params.commentId,{
            content:req.body.content
        },{new:true});
        res.status(200).json(editedComment)        
    }
    catch(error){
        console.log(error);

    }

}