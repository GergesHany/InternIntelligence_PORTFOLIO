const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const SkillSchema = new Schema(
    {
        id: Number, 
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

SkillSchema.plugin(AutoIncrement, { inc_field: "id" });

const Skill = mongoose.model("Skill", SkillSchema);
module.exports = Skill;