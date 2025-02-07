const validUrl = require('../validator/validUrl');

const validateProject = (req, res, next) => {
    const { title, description, technologies, imageUrl, githubUrl, liveUrl } = req.body
    if (!title || !description || !technologies) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (imageUrl && !validUrl(imageUrl) || githubUrl && !validUrl(githubUrl) || liveUrl && !validUrl(liveUrl)) {
        return res.status(400).json({ message: "Invalid URL" });
    }
    next();
}

module.exports = validateProject;