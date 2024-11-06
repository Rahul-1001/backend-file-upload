//app create 

const express=require("express");

const app=express();



//port find karna hai
require("dotenv").config();

const PORT=process.env.PORT || 3000;


//middleware add karna hai

app.use(express.json());


const fileUpload=require("express-fileupload");
app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:"/tmp/"

}));





//database connection

const db=require('./config/database');
db.connect();


//cloud se connect karna hai

const cloudinary=require('./config/cloudinary');

cloudinary.cloudinaryConnect();

//api route mount karna hai

const Upload=require("./routes/FileUpload");

app.use("/api/v1/upload",Upload)



//activate server

app.listen(PORT,()=>{

    console.log(`server is running on port ${PORT}`);
})


