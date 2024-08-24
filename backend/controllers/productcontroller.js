

const { Product } = require('../db')



//........................Get the all Users.................................
const getAllProduct = async(req, res) => {

    productlist =await Product.find()
    
   
        res.send({ message: "All product list" ,payload:productlist})
    
}


// ...................................Add product ................................

const addProduct=async(req,res)=>{
    let productlist =await Product.create(req.body)

    res.send({ message: "Product is added" ,payload:productlist})
}
//  ................Update product....................
const updateProduct=async(req,res)=>{
    let id=req.params._id;
    let list =await Product.findOne({_id:id},req.body)
    if(list===null)
    {
        res.send({message:"Product id is Not valid"})
    }
    else{
        let result=await Product.findOneAndUpdate({_id:id},req.body)
        res.send({message:"Product list is update",payload:req.body})
    }

}
// ................Delete Product................................................
const deleteProduct=async(req,res)=>{
    let id=req.params._id
    let list=await Product.deleteOne({_id:id})
    res.send({message:"product is deleted",payload:list})
}

module.exports = { getAllProduct,addProduct,updateProduct,deleteProduct }