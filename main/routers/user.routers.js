const route = require('express').Router();
const userControllers = require('../controllers/user.controllers');

route.get('/users', userControllers.getUsers);
route.post('/user', userControllers.createUser);
route.get('/user/:id', userControllers.getOneUser);
route.put('/user/:id', userControllers.updateUser);
route.delete('/user/:id', userControllers.deleteUser);

module.exports = route;
