const Router = require('express').Router();
const textController = require('./../controllers/textController');

Router.post('/upload', textController.uploadFile);
Router.post('/analyzeText', textController.analyzeText);

module.exports = Router;