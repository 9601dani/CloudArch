const express = require('express');
const User= require('../models/User');
const UserController = require('../controllers/usersController');

const router = express.Router();

router.post('/addUser', UserController.addUser);
router.get('/getAllUsers', UserController.getAllUsers);
router.post('/getOneUser', UserController.getOneUser);
router.put('/updateUser', UserController.updateUser);
router.delete('/deleteUser/:username', UserController.deleteUser);
router.post('/authUser', UserController.authUser);
router.get('/getByUsername/:username', UserController.getByUsername);


module.exports = router;