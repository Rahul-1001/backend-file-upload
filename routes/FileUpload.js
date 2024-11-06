const express=require("express");

const router=express.Router();

const{imageUpload,localFileUpload,videoUpload,imageSizeReducer}=require("../controllers/fileUploading");

//api route



// router.post("/videoUpload",videoUpload);

router.post("/imageSizeReducer",imageSizeReducer);
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);


module.exports=router;  

