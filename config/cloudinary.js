const cloudinary=require("cloudinary").v2;

require('dotenv').config();

exports.cloudinaryConnect=()=>{

   try {
    
         cloudinary.config({

         cloud_name: process.env.CLOUD_NAME,
        //  ddkoikmv6

         api_key: process.env.API_KEY,
          //177677155197595
          
         api_secret: process.env.API_SECRET
        //   KCN5sHGImtKia4_mEDpk7wVNyjw





    })
    
   } catch (error) {
    console.log(error); 
    
   }

}