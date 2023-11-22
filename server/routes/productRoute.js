const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("THis is the product route");
})

router.get('/:id', (req,res)=>{
    if (req.params.id % 2 == 0){
        res.send("this id is an even number")
    }
    else{
        res.send("odd");
    }
})
module.exports = router;