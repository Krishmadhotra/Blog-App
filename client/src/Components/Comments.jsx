import { Alert, Button, Textarea, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
const Comments = (postId) => {
    const {currentUser}=useSelector((state)=>state.user)
    const [comment,setComment]=useState(" ")

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
        }
    }catch(error){
        console.log(error);
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
        </div>
   
  )
}

export default Comments