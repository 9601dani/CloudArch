const express = require('express');
const PapeleraController = require('../controllers/papeleraController');
const router = express.Router();

router.post('/addPapelera', PapeleraController.addPapelera);
router.get('/getAllPapelera', PapeleraController.getAllPapelera);

module.exports = router;