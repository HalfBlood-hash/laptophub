


const mongoose=require('mongoose')


mongoose.connect('mongodb://0.0.0.0:27017/laptophub')
.then (()=>console.log("database connection success"))
.catch(err=>console.log("error occured in db conection",err))


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
    cart:[{}]
})
const sellerschema =new mongoose.Schema({
    username:{
        type:String
    },
   
    password:{
        type:String
    },
    email:{
        type:String
    }
})


const productSchema=new mongoose.Schema({


    pid:{
        type:Number,
        require:true
    },
    name:{
        type:String
    },
    display:{
        type:String
    },
    image:{
        type:String
    },
    price:{
        type:Number
    },
    ram:{
        type:String
    },
    rom:{
        type:String
    },
    processor:{
        type:String
    },
    color:{
        type:String
    },
    des1:{
        type:String
    },
    des2:{
        type:String
    },
    des3:{
        type:String
    },
    des4:{
        type:String
    },
    des5:{
        type:String
    },
    deliveydate:{
        type:Date
    },
})
const orderSchema=new mongoose.Schema({


    pid:{
        type:Number,
        require:true
    },
    name:{
        type:String
    },
    display:{
        type:String
    },
    image:{
        type:String
    },
    price:{
        type:Number
    },
    ram:{
        type:String
    },
    rom:{
        type:String
    },
    processor:{
        type:String
    },
    color:{
        type:String
    },
    des1:{
        type:String
    },
    des2:{
        type:String
    },
    des3:{
        type:String
    },
    des4:{
        type:String
    },
    des5:{
        type:String
    },
    uname:{
        type:String
    },
    mobno:{
        type:Number
    },
    address:{
        type:String
    },
    deliveydate:{
        type:Date
    },
})

const User=mongoose.model('user',userschema)
const Seller=mongoose.model('seller',userschema)
const Product=mongoose.model('product',productSchema)
const Orders=mongoose.model('order',orderSchema)
module.exports={User,Seller,Product,Orders}