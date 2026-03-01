import multer from 'multer'
import path from 'path'

// storage config
const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null,"uploads/")
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}${file.originalname}`)
    }
})

// file filter
const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith("image")) {
        cb(null,true)
    } else {
        cb(new Error('only image files are allowed'),false);
    }
}

const upload = multer({
  storage,
  fileFilter
});

export default upload;
