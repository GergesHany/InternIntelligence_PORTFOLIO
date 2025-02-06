const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AchievementSchema = new mongoose.Schema(
    {
        id: Number, 
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

AchievementSchema.plugin(AutoIncrement, { inc_field: "id" });

const Achievement = mongoose.model("Achievement", AchievementSchema);
module.exports = Achievement;