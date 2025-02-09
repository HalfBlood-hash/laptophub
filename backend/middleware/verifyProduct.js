


const { ProductModal } = require('../modal/productmodal');


async function verifyProduct(req,res,next)
{
    existedUser= await ProductModal.findOne({pid:req.body.pid})
    if(existedUser===null)
    {
        next()
    }
    else{
        res.send({message:'username already taken'})
    }
}


module.exports=verifyProduct;