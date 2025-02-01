const mongoose=require('mongoose')

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

const ProductModal=mongoose.model('product',productSchema)
module.exports={ProductModal}