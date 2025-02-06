const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); 

const ProjectSchema = new Schema(
    {
        id: Number, // Auto-incremented field
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        technologies: [{
            type: String,
            required: true
        }],
        imageUrl: {
            type: String
        },
        githubUrl: {
            type: String
        },
        liveUrl: {
            type: String
        }
    }, 
    {
      timestamps: true,
    }
);

// Apply auto-increment plugin to id field
ProjectSchema.plugin(AutoIncrement, { inc_field: "id" });

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;