const express = require('express');
const router = express.Router();
const { addJuniorAgent, listJuniorAgents } = require('../controllers/juniorAgentController');
const agentAuth = require('../middleware/agentAuthMiddleware');

router.post('/add', agentAuth, addJuniorAgent);
router.get('/list', agentAuth, listJuniorAgents);

module.exports = router;