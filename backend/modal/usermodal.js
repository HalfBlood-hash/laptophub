const mongoose=require('mongoose')

const userschema =new mongoose.Schema({
    username:{
        type:String
    },
   
    password:{
        type:String
    },
    email:{
        type:String
    },
    isverified:{
        type:Boolean,
        default:false
    },
    cart:[{}],
    verificationCode:String
},{timestamps:true})

const UserModal=mongoose.model('user',userschema)
module.exports={UserModal}