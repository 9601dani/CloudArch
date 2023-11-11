const express = require('express');
const Carpeta= require('../models/Carpeta');
const CarpetaController = require('../controllers/carpetasController');

const router1 = express.Router();

router1.post('/addDirectory', CarpetaController.addCarpeta);
router1.get('/getAllDirectoriesUser', CarpetaController.getAllCarpetasUser);
router1.put('/updatePathDirectory', CarpetaController.moveCarpeta);
router1.post('/copyDirectory', CarpetaController.copyCarpeta);



module.exports = router1;