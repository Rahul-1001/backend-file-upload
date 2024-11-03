const File=require("../models/File");


//localfileupload handler function client se file lekar server pe upload karna hai


exports.localFileUpload=async(req,res)=>{
     
    try {
           //fetch the file 

           const file=req.files.file;

           console.log("files is ",file);

           //kis path pe upload karna chahte hai
           //__ currrent directly ko darsata hai 
           let path=__dirname+"/files/"+ Date.now()+`.${file.name.split('.')[1]}`;
           console.log("path-->",path);
           file.mv(path,(err)=>{
            console.log(err);
           });

           res.json({
            success:true,
            message:"local file uploaded succeessfuly"
           });

        
    } catch (error) {
        

        console.log(error);
    }

}