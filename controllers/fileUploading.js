const File=require("../models/File");

const cloudinary=require("cloudinary").v2;


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


function isFileTypeSupported(type,supportedTypes)
{
    return supportedTypes.includes(type);
}

 async function uploadFileToCloudinary(file,folder,quality)
 {
    const options={folder}
    console.log("temp file path",file.tempFilePath);

      if(quality)
      {
        options.quality=quality;
      }


    options.resource_type="auto";
  return  await cloudinary.uploader.upload(file.tempFilePath,options);
 }


//tempFilePath

//image upload ka handler 

exports.imageUpload=async(req,res)=>{
      

    try {
        //data  fetch
     const{name,tags,email}=req.body;
     console.log(name,tags,email);

     const file=req.files.imageFile;

     console.log(file);

       //validation

       const supportedTypes=["jpg","png","jpeg"];

        //agar mujhe pta lagana hai ki jis file pe mai kaam kmar rha hu vo kis
        //type ka file hai
        const fileType=file.name.split('.')[1].toLowerCase();

         if(!isFileTypeSupported(fileType,supportedTypes)){

             return res.status(400).json({
                success:false,
                message:"file type not supported"
             })

         }

         //file format supported hai to us case me hume cloudinary pe  upload karna hai
           console.log("uploading to codehelp");
         const response=await uploadFileToCloudinary(file,"codehelp")

           console.log(response);


         //db me entry save karni hai 

         const fileData=await File.create({
         name,
         tags,
         email,
         imageUrl:response.secure_url,
          })

       res.json({
        success:true,
        message:"image uploaded successfully",
        imageUrl: response.secure_url
       })

        
    } catch (error) {

        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
        
    }

}

exports.videoUpload=async(req,res)=>{
       
    try {

          //data  fetch
     const{name,tags,email}=req.body;
     console.log(name,tags,email);

     const file=req.files.videoFile;

     console.log(file);


       //validation

       const supportedTypes=["mp4","mov"];

        //agar mujhe pta lagana hai ki jis file pe mai kaam kmar rha hu vo kis
        //type ka file hai
        const fileType=file.name.split('.')[1].toLowerCase();

           //add a upper limit of 5MB for video file size

        //  if(file.size > 5000000)
        //  {
        //     return res.status(400).json({
        //         success:false,
        //         message:"file size too large"
        //      })
        //  }

         if(!isFileTypeSupported(fileType,supportedTypes)){

             return res.status(400).json({
                success:false,
                message:"file type not supported"
             })

         }

         //file format supported hai to us case me hume cloudinary pe  upload karna hai
         console.log("uploading to codehelp");
         const response=await uploadFileToCloudinary(file,"codehelp")

           console.log(response);


           const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
             })
   
          res.json({
           success:true,
           message:"video uploaded successfully",
           imageUrl: response.secure_url
          })
   



        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
        
    }

       
}





exports.imageSizeReducer=async(req,res)=>{

     try {

           //data  fetch
     const{name,tags,email}=req.body;
     console.log(name,tags,email);

     const file=req.files.imageFile;

     console.log(file);

       //validation

       const supportedTypes=["jpg","png","jpeg"];

        //agar mujhe pta lagana hai ki jis file pe mai kaam kmar rha hu vo kis
        //type ka file hai
        const fileType=file.name.split('.')[1].toLowerCase();

         if(!isFileTypeSupported(fileType,supportedTypes)){

             return res.status(400).json({
                success:false,
                message:"file type not supported"
             })

         }

         //file format supported hai to us case me hume cloudinary pe  upload karna hai
           console.log("uploading to codehelp");
         const response=await uploadFileToCloudinary(file,"codehelp",30)

           console.log(response);


         //db me entry save karni hai 

         const fileData=await File.create({
         name,
         tags,
         email,
         imageUrl:response.secure_url,
          })

       res.json({
        success:true,
        message:"image uploaded successfully",
        imageUrl: response.secure_url
       })



        
     } catch (error) {
        
     }

}



///jaise hi ek db me entry save karu vaise hi ek mail send kar du


//agar db me entry karne ke baad koi mail send karna hai to us case me
//post midlleware use karte hai 
//agar db me entry karne se phle karna hai to pre middleware ka use karte hai


