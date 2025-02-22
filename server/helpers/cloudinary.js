const cloudinary = require('cloudinary').v2;
const multer = require("multer")

cloudinary.config({
    cloud_name:'dmfl16vgo',
    api_key:'687958456671215',
    api_secret: 'NRK8RmMhYupO_5tCp6cUsg94i80'
})


const storage = new multer.memoryStorage();

async function imageUploadUtils (file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type: 'auto'
    })

    return result;
}   

const upload = multer ({storage});
module.exports= {upload,imageUploadUtils}