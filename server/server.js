const express = require("express");
const app = express()
const PORT = process.env.PORT||5000;
const connect = require('./config/db');

app.use(express.json({extended: false}));
// app.use('/api/products', require('./routes/productRoute'))
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/products', require('./routes/productRoute'));

connect().then(()=>{
    app.listen(PORT, ()=>{
        console.log("The server is up and running");
    }) 
})
app.get('/', (req,res)=>{
    res.send("This is the homepage");
})

// 