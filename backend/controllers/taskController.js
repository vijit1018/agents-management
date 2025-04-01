const csvParser = require('csv-parser');
const Task = require('../models/Task');
const Agent = require('../models/Agent');

exports.uploadCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        let tasks = [];
        req.file.buffer
            .toString()
            .split('\n')
            .forEach((line, index) => {
                if (index === 0) return; // Skip header row
                const [firstName, phone, notes] = line.split(',');
                if (firstName && phone) {
                    tasks.push({ firstName, phone, notes });
                }
            });

        // Get all agents
        const agents = await Agent.find();
        if (agents.length === 0) {
            return res.status(400).json({ message: "No agents available for task assignment" });
        }

        // Distribute tasks evenly
        let agentIndex = 0;
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].assignedTo = agents[agentIndex]._id;
            agentIndex = (agentIndex + 1) % agents.length; // Round-robin distribution
        }

        // Save tasks to MongoDB
        await Task.insertMany(tasks);

        res.status(201).json({ message: "CSV uploaded and tasks assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get tasks assigned to agents
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};