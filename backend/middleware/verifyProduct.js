

const {Product}=require('../db')


async function verifyProduct(req,res,next)
{
    existedUser= await Product.findOne({pid:req.body.pid})
    if(existedUser===null)
    {
        next()
    }
    else{
        res.send({message:'username already taken'})
    }
}


module.exports=verifyProduct;