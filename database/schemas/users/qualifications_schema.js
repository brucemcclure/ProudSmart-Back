const { Schema } = require("mongoose");

const QualificationSchema = new Schema ({
    type: {
      type: String,
    },
    date: {
      type: Date
    },
    institution: {
      type: String
    }
});

module.exports = QualificationSchema;