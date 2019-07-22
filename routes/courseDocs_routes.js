const express = require("express");
const router = express.Router();
const { courseDocsUpload } = require("./../controllers/awsS3UploadController");

router.post("/multiple-files-upload", (req, res) => {
  courseDocsUpload(req, res, error => {
    console.log("files", req.files);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const docsLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          console.log("file_url", fileLocation);
          docsLocationArray.push(fileLocation);
        }
        // Save the file name into database
        res.json({
          filesArray: fileArray,
          locationArray: docsLocationArray
        });
      }
    }
  });
});

module.exports = router;
