const exp=require('express')
const orderApp=exp.Router()
 

const expressAsyncHandler=require('express-async-handler')
const{getOrders,postOrders,deleteOrder}=require('../controllers/orders-controller')
const { Orders } = require('../db')
 
orderApp.get('/orders',expressAsyncHandler(getOrders))
orderApp.post('/orders',expressAsyncHandler(postOrders))
orderApp.delete('/orders/:pid',expressAsyncHandler(deleteOrder))
 
 
module.exports=orderApp