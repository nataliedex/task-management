const express = require('express');
const router = express.Router();
const schdeuleController = require('../controllers/schedule');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');
const { schema } = require('../models/User');

// schedule routes
router.get('/', ensureAuth, schdeuleController.getSchedule);
router.post('/createProject', schdeuleController.createProject);
router.post('/createTask', schdeuleController.createTask);
router.post('/completeTask/:id', schdeuleController.completeTask);
router.post('/updateTaskDesc/:id', schdeuleController.updateTaskDesc);


module.exports = router