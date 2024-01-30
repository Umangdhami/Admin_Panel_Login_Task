const express = require('express');
const route = express();
const controller = require('../controllers/controllers')


//dashboard Display
route.get('/', controller.defaultRoute)

//user Registration
route.get('/register', controller.register)
route.post('/creatUser', controller.creatUser)

//user Login & Logout
route.get('/login', controller.login)
route.post('/userLogin', controller.userLogin)
route.get('/logOut', controller.logOut)

//Task Managment
route.get('/addTaskPage', controller.addTaskPage);
route.post('/addTask', controller.addTask);
route.get('/showTask', controller.showTask)
route.get('/singleTask/:id', controller.singleTask)
route.get('/editTask/:id', controller.editTask)
route.post('/updateTask', controller.updateTask)
route.get('/deleteTask/:id', controller.deleteTask)
route.get('/allTask', controller.allTask)


module.exports = route