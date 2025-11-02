import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:8
        },
        profilePic:{
            type:String,
            default:" "
        },
        isRentee:{
            type: Boolean,
            default: false
        },
         verificationToken:{
            type: String
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
 

    {
        timestamps:true
        }
    
)

const User = mongoose.model("User",userSchema)
export default User