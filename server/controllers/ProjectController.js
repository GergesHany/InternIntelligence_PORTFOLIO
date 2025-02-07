const Project = require("../models/Project");

const createProject = async (req, res) => {
    const { title, description, technologies, imageUrl, githubUrl, liveUrl } = req.body;
    // The following validation is not necessary because it is already done in the middleware
    
    try {
        const newProject = await Project.create({
            title,
            description,
            technologies,
            imageUrl,
            githubUrl,
            liveUrl
        });
        res.status(201).json({
            message: "Project created successfully",
            Project: {
                id: newProject._id,
                title: newProject.title,
                description: newProject.description,
                technologies: newProject.technologies,
                imageUrl: newProject.imageUrl,
                githubUrl: newProject.githubUrl,
                liveUrl: newProject.liveUrl
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, technologies, imageUrl, githubUrl, liveUrl } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Project ID is required" });
    }

    try {
        const project = await Project.findOne({ _id: id });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.title = title;
        project.description = description;
        project.technologies = technologies;
        project.imageUrl = imageUrl;
        project.githubUrl = githubUrl;
        project.liveUrl = liveUrl;

        await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            Project: {
                id: project._id,
                title: project.title,
                description: project.description,
                technologies: project.technologies,
                imageUrl: project.imageUrl,
                githubUrl: project.githubUrl,
                liveUrl: project.liveUrl
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Project ID is required" });
    }

    try {
        const project = await Project.findByIdAndDelete({ _id: id });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProject = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Project ID is required" });
    }

    try {
        const project = await Project.findOne({ _id: id });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createProject, updateProject, deleteProject, getProjects, getProject };
