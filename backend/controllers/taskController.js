const csvParser = require('csv-parser');
const Task = require('../models/Task');
const Agent = require('../models/Agent');
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

exports.uploadCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Clear all existing tasks before uploading new ones
        await Task.deleteMany({ adminId: req.user.id });

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
        const agents = await Agent.find({ adminId: req.user.id });
        if (agents.length === 0) {
            return res.status(400).json({ message: "No agents available for task assignment" });
        }

        // Distribute tasks evenly
        let agentIndex = 0;
        for (let i = 0; i < tasks.length; i++) {
          tasks[i].assignedTo = agents[agentIndex]._id;
          tasks[i].adminId = req.user.id; // This ensures proper filtering later
          agentIndex = (agentIndex + 1) % agents.length;
        }
        
        // Save tasks to MongoDB
        await Task.insertMany(tasks);
        res.status(201).json({ message: "CSV uploaded and tasks assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.error("Error uploading the tasks:", error);
    }
};

// Get tasks assigned to agents
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ adminId: req.user.id }).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("Error in listing the task:", error);
    }
};

exports.getAgentStats = async (req, res) => {
    try {
      // Fetch all agents
      const agents = await Agent.find({ adminId: req.user.id });
  
      // Aggregate tasks grouped by assignedTo
      const stats = await Task.aggregate([
        { $match: { adminId: new mongoose.Types.ObjectId(req.user.id) } },
        {
          $group: {
            _id: "$assignedTo",
            taskCount: { $sum: 1 },
            notes: { $push: "$notes" }
          }
        }
      ]);
      
  
      // Merge agents with their task stats
      const mergedStats = agents.map(agent => {
        const stat = stats.find(s => s._id?.toString() === agent._id.toString());
  
        return {
          _id: agent._id.toString(),
          name: agent.name,
          email: agent.email,
          taskCount: stat ? stat.taskCount : "Un-assigned",
          notes: stat ? stat.notes : ["Null"]
        };
      });
  
      res.json(mergedStats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching agent stats", error: error.message });
      console.error("Error getting Agentstats:", error);
    }
  };
  