const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { uploadCSV, getTasks, getAgentStats } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/upload', authMiddleware, upload.single('file'), uploadCSV);
router.get('/list', authMiddleware, getTasks);
router.get("/agent-stats", authMiddleware, getAgentStats);


module.exports = router;