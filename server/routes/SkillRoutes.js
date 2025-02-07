const express = require('express');
const Router = express.Router();
const verifyJwt = require('../middleware/verifyJWT');

const {
    createSkill,
    updateSkill,
    deleteSkill,
    getSkills,
    getSkillsCategory
} = require('../controllers/SkillController');

Router.use(verifyJwt);
Router.post('/create', createSkill);
Router.put('/skill/:id', updateSkill);
Router.delete('/skill/:id', deleteSkill);
Router.get('/skills', getSkills);
Router.get('/skills/:category', getSkillsCategory);

module.exports = Router;