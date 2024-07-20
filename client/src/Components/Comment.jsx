import React from 'react'
import {useState,useEffect} from "react"
import moment from "moment"
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
const Comment = ({comment,onLike,onEdit}) => {
    const [user,setUser]=useState({});
    const currentUser=useSelector((state)=>state.user)
    const [isEditing,setIsEditing]=useState(false)
    const [editedContent,setEditedContent]=useState(comment.content)
    useEffect(()=>{
        const getUser=async()=>{
            try{
                const response=await fetch(`/api/user/${comment.userID}`)
                const data=await response.json();
                if(response.ok){
                    setUser(data)
                }


            }catch(error){

            }
        }

    },[comment])

    const handleEdit=()=>{
        setIsEditing(true)
        setEditedContent(comment.content)

    }
    
    const handleSave=async()=>{
        try{
            const response=await fetch(`/api/comment/editComment/${comment._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    content:editedContent
                })
            })
            if(response.ok){
                setIsEditing(false);
                onEdit(comment._id,editedContent)
            }


        }catch(error){


        }
    }
  return(

    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
        </div>
        <div className='flex-1'>
            <div className="flex items-center mb-1">
                <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}`:"Anonymous user"}</span>
                <span className="text-gray-100 text-xs">
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>
        <div>
            {isEditing ? (
                <>
                <Textarea className="mb-2 "
                value={editedContent}               onChange={(e)=setEditedContent(e.target.value)} />
                       <div className='flex justify-end gap-2 text-xs'>/
                        <Button type="button" size="sm"
                        gradientDuoTone="purpleToPink"
                        onClicl={handleSave}>
                            Save
                        </Button>
                        <Button type="button" size="sm"
                        gradientDuoTone="purpleToPink" outline
                        onClick={()=>setIsEditing(false)}>
                        Cancel
                        </Button>
                       </div>
                </>
         

            ):(
            <>
            <p className='text-gray-500 mb-2'>{comment.content}</p>
            <div  className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                <button type="button" onClick={()=>onLike(comment._id)}className='text-gray-400 hover:text-blue-500'>
                    {currentUser && comment.likes.includes(currentUser._id) && 'text-blue-500'}
                    <FaThumbsUp  className='text-sm'/>
                </button>
                <p className="text-gray-400">{
                    comment.numberOfLikes
                    >0 &&  comment.numberOfLikes + " " + (comment.numberOfLikes===1 ? "like" :"likes")}</p>
                    {
                        currentUser && (currentUser._id===comment.userId || currentUser.isAdmin)  && (
                           <button type="button " 
                           onClick={handleEdit}className="text-gray-400 hover:text-blue-500"></button>
                        )
                    }
            </div>
            </>
            )}
        </div>
        </div>

    </div>
  )
}

export default Comment