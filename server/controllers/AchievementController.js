const Achievement = require('../models/Achievement');
const validUrl = require('../validator/validUrl');

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
                id: newAchievement._id,
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

    if (!id) {
        return res.status(400).json({ message: 'Achievement ID is required' });
    }
    
    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (PostUrl && !validUrl(PostUrl)) {
        return res.status(400).json({ message: 'Invalid URL' });
    }

    try {
        const achievement = await Achievement.findOne({ _id: id });

        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }

        achievement.title = title;
        achievement.description = description;
        achievement.PostUrl = PostUrl;

        await achievement.save();
        res.status(200).json({ 
            message: 'Achievement updated successfully',
            Achievement: {
                id: achievement._id,
                title: achievement.title,
                description: achievement.description,
                PostUrl: achievement.PostUrl
            }
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const deleteAchievement = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Achievement ID is required' });
    }
    try {
        const achievement = await Achievement.findOne({ _id: id });
        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }
        await Achievement.deleteOne({ _id: id });
        res.status(200).json({ message: 'Achievement deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAchievements = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Achievement ID is required' });
    }        
    try {
        const achievement = await Achievement.findOne({ _id: id });
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