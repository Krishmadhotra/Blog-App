import { Alert, Button, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
const CommentSection = (postId) => {
    const {currentUser}=useSelector((state)=>state.user)
    const [comment,setComment]=useState(" ")
    const [comments,setComments]=useState([])
    const [commentError,setCommentError]=useState(null)
    const navigate=useNavigate();
    const [showModal,setShowModal]=useState(false)
    const [commentToDelete,setCommentToDelete]=useState(null)

    useEffect(()=>{
        const fetchComments=async()=>{
            try{
                const response =await fetch(`/api/comment/getPostComments/${postId}`);
                if(response.ok){
                const data=await response.json();
                setComments(data);
                navigate("/signin")
                }
                const res=await fetch(`/api/comment/likeComment/${commentId}`,{
                    method:"PUT",

                })
                if(res.ok){
                const data=await res.json();
                setComments(comments.map((comment)=>
                    comment._id === commentId ? {
                        ...comment,
                        likes:data.likes,
                        numberOfLikes:data.numberOfLikes,
                    }:comment))
                }

            }catch(error){
                console.log(error);
            }

        }
        fetchComments()
    },[postId])
    const handleSubmit=async(e)=>{
        e.preventdefault();
        if(comment.length>200){
            return;
        }
        try{
        const response=await fetch('/api/comments/create',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:json.stringify({content:comment,postId:postId,userId:currentUser._userId})
        });
        const data=await response.json();
        if(response.ok){
            setComment(' ')
            setCommentError(null);
            setComments([data,...comments])
        }
    }catch(error){
        console.log(error);
    }
    }
    const handleLike=async(commentId)=>{
        try{
            if(!currentUser){
                return;
            }

        }


    }

    const handleEdit=async()=>{
       setComments(
        comments.map((c)=>c._id===comment._id?{...c,content:editedContent}: c)
       ) 
       
    const handleDelete=async(req)=>{
        try{
            if(!currentUser){
                 navigate("/signin")
                 return;
            }

            const res=await fetch(`/api/comment/deleteComment/${commentId}`.{
                method:"Delete"
            })
            if(res.ok){
                const data=await res.json();
                setComments(comments.filter((comment)=>comment._id!==commentId))
            }

            }
            const d
        }

    }

    }
      return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as :</p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} />
                    alt=""
                    <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.username}</Link>
                </div>

            ):(
                <div className='text-sm text-teal-500 my-5'>
                    You must be Signed In to Comment 
                    <Link className='text-blue-500 hover:underline 'to={`/signin`}>Sign In</Link>
                </div>

            )}

            {currentUser && (
                <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                    <Textarea
                        placeholder="Add a Comment"
                        rows='3'
                         maxLength='200' 
                        onChange={(e)=>setComment(e.target.value)}
                        value={comment}/>
                        <div className='flex justify-between itemsc-center mt-5 '>
                            <p className="text-gray-500 text-xs">{200-comment.length} characters remaining </p>
                            <Button outline gradientDuoTone="purpleToPink" type="submit">Submit</Button>
                        </div>
                    {commentError && (
                           <Alert color='failure' className='mt-5'>
                           {commentError}
                       </Alert>
                        
                    )}
                     
                </form>
              
            )}
            {comments.length===0 ? (
                <p className="text-sm my-5">No Comments yet! </p>
            ):(
                <>
                   <div className="text-sm my-5 flex items-center gap-1">
                    <p>Comments</p>
                    <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                        <p>{comments.length}</p>
                    </div>

                </div>

               {
                comments.map((comment)=>{
                    <Comment key={comment._id}
                    comment={comment} 
                    onLike={handleLike}
                    onEdit={handleEdit}
                    onDelete={(commentId)=>{
                        setShowModal(true)
                        setCommentToDelete(commentId)
                    }}
                    />
                })
               }

                </>
             
            )}
        </div>
   
  )
}

export default CommentSection 