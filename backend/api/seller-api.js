




// make the mini express app
const exp =require('express')
const sellerApp=exp.Router()

const  expressErrorHandler=require('express-async-handler')
const verifyUser=require('../middleware/verifyUser')
const{login,registerNewseller}=require('../controllers/sellercontroller')


sellerApp.post('/registerseller',expressErrorHandler(registerNewseller))
sellerApp.post('/login',expressErrorHandler(login))

module.exports=sellerApp