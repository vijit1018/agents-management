const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

// Add a new agent
exports.addAgent = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) return res.status(400).json({ message: "Agent already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAgent = new Agent({ name, email, mobile, password: hashedPassword });

        await newAgent.save();
        res.status(201).json({ message: "Agent added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all agents
exports.getAgents = async (req, res) => {
    try {
        const agents = await Agent.find().select("-password"); // Exclude password
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update agent details
exports.updateAgent = async (req, res) => {
    try {
        const { name, mobile } = req.body;
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, { name, mobile }, { new: true });

        if (!updatedAgent) return res.status(404).json({ message: "Agent not found" });

        res.json({ message: "Agent updated successfully", updatedAgent });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete an agent
exports.deleteAgent = async (req, res) => {
    try {
        const deletedAgent = await Agent.findByIdAndDelete(req.params.id);

        if (!deletedAgent) return res.status(404).json({ message: "Agent not found" });

        res.json({ message: "Agent deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};