const express = require('express');
const User= require('../models/User');
const UserController = require('../controllers/usersController');

const router = express.Router();

router.post('/addUser', UserController.addUser);
router.get('/getAllUsers', UserController.getAllUsers);
router.put('/updateUser', UserController.updateUser);
router.delete('/deleteUser', UserController.deleteUser);
router.post('/authUser', UserController.authUser);


module.exports = router;