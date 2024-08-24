


// make the mini express app
const exp =require('express')
const userApp=exp.Router()

const  expressErrorHandler=require('express-async-handler')
const verifyUser=require('../middleware/verifyUser')
const{getAllUser,registerNewUser,login,addtocart,deletetocart,cartview}=require('../controllers/usercontroller')


userApp.get('/getuser',expressErrorHandler(getAllUser))
userApp.get('/cartview/:username',expressErrorHandler(cartview))
userApp.post('/registeruser',verifyUser,expressErrorHandler(registerNewUser))
userApp.post('/login',expressErrorHandler(login))
userApp.post('/addtocart/:username',expressErrorHandler(addtocart))
userApp.post('/deletecart/:username',expressErrorHandler(deletetocart))

module.exports=userApp