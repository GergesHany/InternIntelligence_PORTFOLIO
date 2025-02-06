const Achievement = require('../models/Achievement');
const validUrl = require('../validator/validUrl');


// Create
const createAchievement = async (req, res) => {
    const { title, description, PostUrl } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (PostUrl && !validUrl(PostUrl)) {
        return res.status(400).json({ message: 'Invalid URL' });
    }

    try {
        const newAchievement = await Achievement.create({
            title,
            description,
            PostUrl
        });
        res.status(201).json({ 
            message: 'Achievement created successfully',
            Achievement: {
                id: newAchievement.id,
                title: newAchievement.title,
                description: newAchievement.description,
                PostUrl: newAchievement.PostUrl
            }
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }    
}

const updateAchievement = async (req, res) => {
    const { id } = req.params;
    const {title, description, PostUrl} = req.body;
    
    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (PostUrl && !validUrl(PostUrl)) {
        return res.status(400).json({ message: 'Invalid URL' });
    }

    try {
        const achievement = await Achievement.findOne({ id });

        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }

        achievement.title = title;
        achievement.description = description;
        achievement.PostUrl = PostUrl;

        await achievement.save();
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const deleteAchievement = async (req, res) => {
    const { id } = req.params;
    try {
        await Achievement.deleteOne({ id });
        res.status(200).json({ message: 'Achievement deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAchievements = async (req, res) => {
    const { id } = req.params;
    try {
        const achievement = await Achievement.findOne({ id });
        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }
        res.status(200).json({ achievement });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find(); // Get all achievements
        res.status(200).json({ achievements });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createAchievement,
    updateAchievement,
    deleteAchievement,
    getAchievements,
    getAllAchievements
}