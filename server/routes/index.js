const route = require('express').Router();
const Controller = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

route.post('/register', Controller.register);
route.post('/login', Controller.login);
route.post('/foods', authentication, Controller.foods);
route.get('/foods', authentication, Controller.viewFoods);
route.delete('/foods/:id', authentication, authorization, Controller.deleteFoods);

module.exports = route;