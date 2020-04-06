const route = require('express').Router();
const Controller = require('../controllers');
const authentication = require('../middlewares/authentication');

route.post('/register', Controller.register);
route.post('/login', Controller.login);
route.post('/foods', authentication, Controller.foods);

module.exports = route;