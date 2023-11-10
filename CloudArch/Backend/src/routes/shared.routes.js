const express = require('express');
const SharedController = require('../controllers/sharedController');
const router = express.Router();

router.post('/addShared', SharedController.addShared);
router.get('/getAllSharedByUser', SharedController.getAllSharedByUser);
router.delete('/deleteShared', SharedController.deleteShared);

module.exports = router;