


const exp =require('express')
const ProductApp=exp.Router()


const verifyUser=require('../middleware/verifyUser')
const expressAsyncHandler = require('express-async-handler')
const{getAllProduct,addProduct,updateProduct,deleteProduct}=require('../controllers/productcontroller')




ProductApp.get('/getproduct',expressAsyncHandler(getAllProduct))
ProductApp.post('/addproduct',expressAsyncHandler(addProduct))
ProductApp.put('/updateproduct/:_id',expressAsyncHandler(updateProduct))
ProductApp.delete('/deleteproduct/:_id',expressAsyncHandler(deleteProduct))
module.exports=ProductApp