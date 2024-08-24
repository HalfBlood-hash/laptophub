
const { Seller,Product } = require('../db')

const bcrypyt = require('bcryptjs')
const jwt =require('jsonwebtoken')



const registerNewseller = async (req, res) => {


    userlist = new Seller(req.body)
    let hashpassword = await bcrypyt.hash(userlist.password, 5)
    userlist.password = hashpassword
    let newuser = await userlist.save()
    res.send({ message: "Seller is resgited", payload: newuser })
}



const login=async(req,res)=>{
    
    SESSION_KEY='abcde'
    let userlist=await Seller.findOne({username:req.body.username})
    if(userlist===null)
    {
        res.send({message:"Invalid Username"})
    }
    else
    {
        let password=await bcrypyt.compare(req.body.password,userlist.password)

        if(password)
        {
            let jwttoken=jwt.sign({username:req.body.username},SESSION_KEY,{expiresIn:'1d'})
            res.send({message:'Login successful',token:jwttoken,user:userlist})
        }
        else{
            res.send({message:"Invalid password"})
        }
    }
}













module.exports = {login,registerNewseller }