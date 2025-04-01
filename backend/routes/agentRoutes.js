const express = require('express');
const { addAgent, getAgents, updateAgent, deleteAgent } = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/add', authMiddleware, addAgent);
router.get('/list', authMiddleware, getAgents);
router.put('/update/:id', authMiddleware, updateAgent);
router.delete('/delete/:id', authMiddleware, deleteAgent);

module.exports = router;