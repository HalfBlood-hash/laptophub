


// make the mini express app
const exp =require('express')
const userApp=exp.Router()

const  expressErrorHandler=require('express-async-handler')
const verifyUser=require('../middleware/verifyUser')
const{getAllUser,registerNewUser,login,addtocart,deletetocart,cartview, verifyemail, resendOpt}=require('../controllers/usercontroller')


userApp.get('/getuser',expressErrorHandler(getAllUser))
userApp.get('/cartview/:username',expressErrorHandler(cartview))
userApp.post('/registeruser',verifyUser,expressErrorHandler(registerNewUser))
userApp.post('/verifyemail',expressErrorHandler(verifyemail))
userApp.post('/login',expressErrorHandler(login))
userApp.post('/addtocart/:username',expressErrorHandler(addtocart))
userApp.post('/deletecart/:username',expressErrorHandler(deletetocart))
userApp.post('/resend',expressErrorHandler(resendOpt))

module.exports=userApp