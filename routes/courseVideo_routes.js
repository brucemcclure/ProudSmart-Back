const express = require("express");
const router = express.Router();
const { videoUpload } = require("./../controllers/awsS3UploadController");

//this 'single-video-uplaod' will be used in Component
router.post("/single-video-upload", (req, res) => {
  videoUpload(req, res, error => {
    console.log("requestOkokok", req.file);
    console.log("error", error);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      // undefined means the file name is not present
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success here is the profile picture name, and the url of the picture file in s3 bucket.
        const videoName = req.file.key;
        const videoLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          video: videoName,
          location: videoLocation
        });
      }
    }
  });
});

module.exports = router;
