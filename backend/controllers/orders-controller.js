const {Orders,User}=require('../db')
 
const getOrders=async(req,res)=>{
    let orderList=await Orders.find()
    console.log('this is order list',orderList)
    let user=await User.find()
    res.send({message:'get all order',payload:orderList,user:user})
}
const postOrders=async(req,res)=>{
 
    let list =req.body
    // list._id=null
    console.log(list)
    newlist=JSON.stringify(list)
    delete newlist._id
    console.log(newlist)
 
    let orders=await Orders.create(list)    
    console.log(req.body)
    res.send({message:'Orders Placed',payload:orders})
}
 
 
 
 
const deleteOrder=async(req,res)=>{
    let id=req.params.pid
    console.log(id,"isd is")
    let prd=await Orders.findOne({_id:id})
    if(prd===null)
    {
        res.send({message:"product id is invalid"})
    }
    else
    {
 
        let product= await Orders.deleteOne({_id:id})
   
        res.send({message:" product is deleted",payload:product})
    }
}
 
module.exports={getOrders,postOrders,deleteOrder}