// controllers/agentAuthController.js
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginAgent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const agent = await Agent.findOne({ email });
        if (!agent) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, agent.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: agent._id, role: 'agent' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, agent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};