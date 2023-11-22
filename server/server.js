const express = require("express");
const app = express()
const PORT = process.env.PORT||5000;
const connect = require('./config/db');

app.use('/api/products', require('./routes/productRoute'))
app.use('/api/user', require('./routes/userRoute'));

connect().then(()=>{
    app.listen(PORT, ()=>{
        console.log("The server is up and running");
    }) 
})
app.get('/', (req,res)=>{
    res.send("This is the homepage");
})

