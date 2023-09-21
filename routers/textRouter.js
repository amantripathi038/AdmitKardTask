const Router = require('express').Router();
const textController = require('./../controllers/textController');

Router.post('/upload', textController.uploadFile);

module.exports = Router;