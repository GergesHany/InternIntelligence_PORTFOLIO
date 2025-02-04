const mongoose = require("mongoose");
const AchievementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        PostUrl: {
            type: String
        }
    }, 
    {
      timestamps: true, 
    }
);

const Achievement = mongoose.model("Achievement", AchievementSchema);
module.exports = Achievement;