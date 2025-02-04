const mongoose = require("mongoose");

// const ProjectSchema = new Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     technologies: [{ type: String, required: true }],
//     imageUrl: { type: String },
//     githubUrl: { type: String },
//     liveUrl: { type: String }
//   }, { timestamps: true });

const ProjectSchema = new Schema(
    {
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


const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;