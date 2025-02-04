const mongoose = require("mongoose");

const SkillSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }, 
    {
      timestamps: true,
    }
);

const Skill = mongoose.model("Skill", SkillSchema);
module.exports = Skill;