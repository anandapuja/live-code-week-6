const route = require('express').Router();
const Controller = require('../controllers');

route.post('/register', Controller.register);

module.exports = route;