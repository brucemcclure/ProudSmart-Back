const express = require("express");
const router = express.Router();
const {
  courseProfileImgUpload
} = require("./../controllers/awsS3UploadController");

router.post("/courseProfile-img-upload", (req, res) => {
  courseProfileImgUpload(req, res, error => {
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
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation
        });
      }
    }
  });
});

module.exports = router;
