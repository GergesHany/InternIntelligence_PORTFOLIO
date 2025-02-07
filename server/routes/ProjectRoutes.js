const express = require('express');
const Router = express.Router();
const verifyJwt = require('../middleware/verifyJWT');
const validateProject = require('../middleware/validateProjectRequest');
const { 
    createProject, 
    updateProject,  
    deleteProject, 
    getProjects, 
    getProject 
} = require('../controllers/ProjectController');

Router.use(verifyJwt);
Router.delete('/project/:id', deleteProject);
Router.get('/project/:id', getProject);
Router.get('/projects', getProjects);

Router.use(validateProject);
Router.post('/create', createProject);
Router.put('/project/:id', updateProject);

module.exports = Router;
