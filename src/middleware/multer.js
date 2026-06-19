import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\Users\\ashok\\BackendUsingExpreesjs\\src\\public\\TEMP') ; 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

 export const upload = multer({ storage: storage } )


// const upload = multer({
//   storage: storage,

//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB        // we can limits on the file size 
//   },

//   fileFilter: function(req, file, cb) {

//     // allowed mime types                             // similarly on file type 
//     const allowed = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg"
//     ];

//     if (allowed.includes(file.mimetype)) {        
//       cb(null, true);
//     } else {
//       cb(new Error("Only images are allowed"));
//     }
//   }
// });