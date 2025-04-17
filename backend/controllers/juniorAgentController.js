const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.addJuniorAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: "Agent already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
      agentId: req.agent.id // reference to senior agent
    });

    await newAgent.save();
    res.status(201).json({ message: "Junior agent created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.listJuniorAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ agentId: req.agent.id }).select('-password');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};