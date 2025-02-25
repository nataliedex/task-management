const express = require('express');
const router = express.Router();
const schdeduleController = require('../controllers/schedule');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');
const { schema } = require('../models/User');

// schedule routes
router.get('/', ensureAuth, schdeduleController.getSchedule);
router.post('/createProject', schdeduleController.createProject);
router.post('/createTask', schdeduleController.createTask);
router.post('/completeTask/:id', schdeduleController.completeTask);
router.post('/updateTaskDesc/:id', schdeduleController.updateTaskDesc);
router.post('/updateTaskAssignment/:id', schdeduleController.updateTaskAssignment);


module.exports = router