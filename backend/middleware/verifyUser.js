

const {User}=require('../db')


async function verifyUser(req,res,next)
{
    existedUser= await User.findOne({username:req.body.username})
    if(existedUser===null)
    {
        next()
    }
    else{
        res.send({message:'username already taken'})
    }
}


module.exports=verifyUser;