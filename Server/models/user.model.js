import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicutre:{
        type:String,
        default:"https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg"

    },
    isAdmin:{
        type:Boolean,
        default:false
    },
}, {timestamps:true}
);


const Users=mongoose.model("Users",userSchema)

export default Users;