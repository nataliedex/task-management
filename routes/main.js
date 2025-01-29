const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');

// main routes
router.get('/', homeController.getIndex);


module.exports = router;