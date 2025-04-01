const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { uploadCSV, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/upload', authMiddleware, upload.single('file'), uploadCSV);
router.get('/list', authMiddleware, getTasks);

module.exports = router;