

const {UserModal}=require('../modal/usermodal')


async function verifyUser(req,res,next)
{
    let existedUser= await UserModal.findOne({email:req.body.email})
    if(existedUser===null)
    {
        next()
    }
    else{
        res.status(400).json({success:false,message:"user already exits please login"})
    }
}


module.exports=verifyUser;