
// make the express app
const exp=require('express')
const app=exp()


const path=require('path')
// connect the angular with server
app.use(exp.static(path.join(__dirname,'../client/dist/client/browser')))

app.use(exp.json())


const userApp = require('./api/user-api')
app.use('/user-api',userApp)

const productApp=require('./api/product-api')
app.use('/product-api',productApp)

const OrderApp=require('./api/order-api')
app.use('/order-api',OrderApp)


const sellerApp = require('./api/seller-api')
app.use('/seller-api',sellerApp)

// to load the file on reload
app.use((req,res,next)=>{
    res.sendFile(
        path.join(__dirname,'../client/dist/client/browser/index.html')
    )
})

// ................middleware to handdle the Error
app.use((err,req,res,next)=>{
    res.send({message:'message from error handler',payload:err.message})
})




// maken the express app listen to port number 4000
app.listen(4000,()=>console.log("listening on the port 4000"))