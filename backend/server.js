const express = require('express')
const app = express()
const cors = require("cors")
const cookieParser=require("cookie-parser")
const {PORT} = require('./config')
const userRoute = require('./routes/users')
const productRoute = require('./routes/client')


// middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:4200",
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    exposedHeaders:['Content-Length','Content-Type','Set-Cookie','Origin','Access-Control-Allow-Credentials']
}))

// routes
app.use('/user', userRoute)
app.use('/products', productRoute)

// serve app
app.listen(PORT, ()=>console.log(`Node server running on ${PORT}`))