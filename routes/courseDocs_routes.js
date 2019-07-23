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
        let fileArray = req.files;
        const docsLocationArray = [];
        const docsNameArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          let fileLocation = fileArray[i].location;
          let fileName = fileArray[i].key;
          console.log("file_url", fileLocation);
          docsLocationArray.push(fileLocation);
          console.log("file_name", fileName);
          docsNameArray.push(fileName);
        }
        // Save the file name into database
        res.json({
          filesArray: docsNameArray,
          locationArray: docsLocationArray
        });
      }
    }
  });
});

module.exports = router;
