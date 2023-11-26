const mongoose = require("mongoose");
const config = require("./keys");
const db = config.mongoURI;

const connectDB = async () =>{
    try{
        let res = await mongoose.connect(db)
        console.log("connected to the database")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }

};

module.exports = connectDB;
// random comment
// fijfsdifusdifu
