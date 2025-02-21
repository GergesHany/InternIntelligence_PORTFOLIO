const express = require('express');
const Router = express.Router();
const verifyJwt = require('../middleware/verifyJWT');
const {
    createAchievement,
    updateAchievement,
    deleteAchievement,
    getAchievements,
    getAllAchievements
} = require('../controllers/AchievementController');

Router.use(verifyJwt);
Router.post('/create', createAchievement);
Router.put('/achievement/:id', updateAchievement);
Router.delete('/achievement/:id', deleteAchievement);
Router.get('/achievement/:id', getAchievements);
Router.get('/achievements', getAllAchievements);

module.exports = Router;