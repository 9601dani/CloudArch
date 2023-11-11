const express = require('express');
const ArchivoController = require('../controllers/archivosController');
const router = express.Router();

router.post('/addFile', ArchivoController.addArchivo);
router.get('/getAllFilesUser', ArchivoController.getAllArchivosUser);
router.get('/getOneFile', ArchivoController.getOneFile);
router.put('/updateFile', ArchivoController.updateFile);
router.delete('/deleteFile', ArchivoController.deleteFile);
router.put('/updatePath', ArchivoController.updatePath);

module.exports = router;