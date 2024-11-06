const mongoose = require("mongoose");

const nodemailer = require("nodemailer");


const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }

})

//post middleware

fileSchema.post("save",async function(doc){

    try {
        console.log("doc is ",doc);
        //jo entry databse me create hui hai usi ko doc bol rhe hai


        let transporter=nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS

                }


        })

        //send mail
        let info=await transporter.sendMail({
                from:`rahul babu`,
                to:doc.email,
                subject:"hello ",
                html:`<h2>    hello world </h2>   <p>nothing</p> `


        })

        console.log("INFO",info); 

        
           

        
    } catch (error) {

        console.error(error);
        
    }

})


const File=mongoose.model("File",fileSchema);
module.exports=File; 