const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("THis is the user route");
})

module.exports = router;