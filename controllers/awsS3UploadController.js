const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: "proudsmarts3bucket"
});

/**
 * Profile Image Upload starts - single file Upload
 */
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "proudsmarts3bucket/profile_pictures",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 2000000 }, // Set limite of the file you want to upload, in bytes: 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    checkImgFileType(file, cb);
  }
}).single("profileImage");

// Check File Type
// @param file
// @param cb
// @return {*}
function checkImgFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  /**  Check mime
   * A MIME type is a label used to identify a type of data. It is used so software can know how to handle the data. It serves the same purpose on the Internet that file extensions do on Microsoft Windows.
   * So if a server says "This is text/html" the client can go "Ah, this is an HTML document, I can render that internally", while if the server says "This is application/pdf" the client can go "Ah, I need to launch the FoxIt PDF Reader plugin that the user has installed and that has registered itself as the application/pdf handler."
   */
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
////////////////////single Video file upload controller
const videoUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "proudsmarts3bucket/videos",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  //size in bytes: 2000000 bytes = 2 MB, comment the limits if you don't wanna set limits for you file.
  limits: { fileSize: 100000000 },
  fileFilter: function(req, file, cb) {
    checkVideoFileType(file, cb);
  }
}).single("singleVideo");

/**
 * checkVideoFileType
 */
function checkVideoFileType(file, cb) {
  // Allowed ext, only allow mp4 video to be uploaded
  const filetypes = /mp4/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  /**  Check mime
   * A MIME type is a label used to identify a type of data. It is used so software can know how to handle the data. It serves the same purpose on the Internet that file extensions do on Microsoft Windows.
   * So if a server says "This is text/html" the client can go "Ah, this is an HTML document, I can render that internally", while if the server says "This is application/pdf" the client can go "Ah, I need to launch the FoxIt PDF Reader plugin that the user has installed and that has registered itself as the application/pdf handler."
   */
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: A single mp4 video Only!");
  }
}
//////////////

/**
 * Course profile Image Upload starts - single file Upload
 */
const courseProfileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "proudsmarts3bucket/documents",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 2000000 }, // Set limite of the file you want to upload, in bytes: 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    checkImgFileType(file, cb);
  }
}).single("courseProfileImage");
////////////////

/**
 * MULTIPLE COURSE DOC FILES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 ) number can be changed
const courseDocsUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "proudsmarts3bucket/documents",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 10000000 }, // file size limit is 10 MB, In bytes: 1000000 bytes = 1 MB
  fileFilter: function(req, file, cb) {
    checkDocFilesType(file, cb);
  }
}).array("multipleFiles", 4); //we can change this 4 to any number, like how many files you wanna upload, or deleted the number so that we can upload numerous files we want.

// Check File Type
// @param file
// @param cb
// @return {*}
function checkDocFilesType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|docx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  /**  Check mime
   * A MIME type is a label used to identify a type of data. It is used so software can know how to handle the data. It serves the same purpose on the Internet that file extensions do on Microsoft Windows.
   * So if a server says "This is text/html" the client can go "Ah, this is an HTML document, I can render that internally", while if the server says "This is application/pdf" the client can go "Ah, I need to launch the FoxIt PDF Reader plugin that the user has installed and that has registered itself as the application/pdf handler."
   */
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: jpeg/jpg/png/gif/docx files Only!");
  }
}

/************* */

module.exports = {
  profileImgUpload,
  videoUpload,
  courseProfileImgUpload,
  courseDocsUpload
};
