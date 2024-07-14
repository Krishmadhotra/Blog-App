import { Alert, Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useState,useRef,useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from '../firebase';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const DashProfile = () => {
    const currentUser=useSelector((state)=>state.user)
    const [imageFile,setImageFile]=useState(null)
    const[imageFileURL,setImageFileURL]=useState(null)
    const[imageFileUploadProgress,setImageFileUploadProgress]=useState(null)
    const[imageFileUploadErr,setImageFileUploadErr]=useState(null)
    console.log(imageFileUploadProgress);
    const filePickerRef=useRef();

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setImageFile(file)
            setImageFileURL(URL.createObjectURL(file));
        }
    };

    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile]);

    const uploadImage=async()=>{

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read ;
//       allow write : if
//       request.resource.size <2 *1024 *1024 && request.resource.contentType.matches('immage/.*')}
//   }
        setImageFileUploadErr(null)
        const storage=getStorage(app)
        const fileName=new Date().getTime()+ imageFile.name;
        const storageRef=ref(storage,fileName);
        const uploadTask=uploadBytesResumable(storageRef,imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
               const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100 ;
               setImageFileUploadProgress(progress.toFixed(0));
            },
            (error)=>{
                setImageFileUploadErr("Could not upload Image")
                setImageFileUploadProgress(null)
                setImageFile(null)
                setImageFileURL(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileURL(downloadURL)
                })
            }
        )}
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
    <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
    <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} hidden ref={filePickerRef}/>
        <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>
            filePickerRef.current.click()}>

            {imageFileUploadProgress && (
                <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
                strokewidth={5}
                styles={{
                    root:{
                        width:'100%',
                        height:'100%',
                        position:'absolute',
                        top:0,
                        left:0
                    },
                    path:{
                        stroke:`rgba(162,152,199,${imageFileUploadProgress/100})`
                    }
                }}
                />
            )}
            <img src={imageFileURL ||currentUser.profilePicture} alt={"user"} className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
        </div>
        {imageFileUploadErr && 
              <Alert color="failure">
                {imageFileUploadErr}
              </Alert>
        }
      
        <TextInput 
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
        />

        <TextInput 
            type="text"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
        />

        <TextInput 
            type="text"
            id="password"
            placeholder='password'
        />

        <Button type='submit' gradientDuoTone='purpleToPink' outline>Update</Button>
    </form>
    <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer ">Delete Account</span>
        <span className="cursor-pointer"> Sign Out</span>
    </div>
    </div>
  )
}

export default DashProfile