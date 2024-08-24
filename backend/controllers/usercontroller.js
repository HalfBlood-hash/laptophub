const { User,Product } = require('../db')

const bcrypyt = require('bcryptjs')
const jwt =require('jsonwebtoken')

//........................Get the all Users.................................
const getAllUser = async(req, res) => {
    let userlist=await User.find()
    

        res.send({ message: "All user list ",payload:userlist })
    
}
//  ...........Cart View ....................................................
const cartview=async(req,res)=>{
    let userData=await User.findOne({username:req.params.username})
    cartdata=userData.cart
    let product=[]
    const abcValues = cartdata.map(obj => obj.abc);
    for(abc of abcValues)
    {
        let pid=abc
        let plist =await Product.findOne({_id:pid})
        product.push(plist)
        console.log('plist',plist)

        
    }
    
   
    res.send({message:"UserDetails",payload:product})
}

// ....................post the user........................

const registerNewUser = async (req, res) => {


    userlist = new User(req.body)
    let hashpassword = await bcrypyt.hash(userlist.password, 5)
    userlist.password = hashpassword
    let newuser = await userlist.save()
    res.send({ message: "user is resgited", payload: newuser })
}


// ..........................................Login......................................................
const login=async(req,res)=>{
    
    SESSION_KEY='abcde'
    let userlist=await User.findOne({username:req.body.username})
    if(userlist===null)
    {
        res.send({message:"Invalid Username"})
    }
    else
    {
        let password=await bcrypyt.compare(req.body.password,userlist.password)
        console.log(password)
        if(password)
        {
            let jwttoken=jwt.sign({username:req.body.username},SESSION_KEY,{expiresIn:'1d'})
            res.send({message:'Login successful',token:jwttoken,payload:userlist,user:userlist})
            
        }
        else{
            res.send({message:"Invalid password"})
        }
    }
}


// ..............................................Add to Cart................................................

const addtocart=async(req,res)=>{
    let productId=req.body.abc;
    // console.log(productId)
    let user=req.params.username;
    let productlist=await Product.findOne({_id:productId})
    if(productlist===null)
    {
        res.send({message:"Sorry Product is Not available right Now"})
    }
    else{
        let cartlist =await User.findOne({_id:productId})
        let userlist=await User.findOne({username:user})
        userlist.cart.push(req.body)
        let updateedUser =await User.findOneAndUpdate({username:user},userlist)
        res.send({message:"Added to cart",payload:req.body})
    }
}

// ..............Delete From Cart............................
const deletetocart=async(req,res)=>{
    let username=req.params.username
    // console.log(username)
    let data=req.body.abc
    console.log('this is data',data)
    let result=await User.findOneAndUpdate({username:username},{'$pull':{cart:{abc:data}}})
    // console.log(result)
    res.send({message:"Remove Form cart",payload:result})
}








module.exports = { getAllUser, registerNewUser,login ,addtocart,deletetocart,cartview}