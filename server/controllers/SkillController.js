const Skill = require("../models/Skill");

const createSkill = async (req, res) => {
    const { name, category } = req.body;
    if (!name || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newSkill = await Skill.create({
            name,
            category
        });
        res.status(201).json({
            message: "Skill created successfully",
            Skill: {
                id: newSkill._id,
                name: newSkill.name,
                category: newSkill.category
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Skill ID is required" });
    }

    try {
        const skill = await Skill.findOne({ _id: id });
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        skill.name = name;
        skill.category = category;

        await skill.save();

        res.status(200).json({
            message: "Skill updated successfully",
            Skill: {
                id: skill._id,
                name: skill.name,
                category: skill.category
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteSkill = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Skill ID is required" });
    }

    try {
        const skill = await Skill.findOneAndDelete({ _id: id });
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        const categories = await Skill.distinct("category");
        const result = {};

        categories.forEach(category => {
            result[category] = skills
                .filter(skill => skill.category === category)
                .map(skill => ({ name: skill.name, id: skill._id })); 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getSkillsCategory = async (req, res) => {
    const { category } = req.params;
    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }
    try {
        const skills = await Skill.find({ category });
        res.status(200).json({ 
            [category]: skills.map(skill => skill.name)
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createSkill, updateSkill, deleteSkill, getSkills, getSkillsCategory };