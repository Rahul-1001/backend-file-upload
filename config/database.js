const mongoose = require('mongoose');

require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true      
    }).then(()=>{
        console.log("database connected successfuly");
        
        
    }).catch((err)=>{
       console.log(err);  
    })
}

