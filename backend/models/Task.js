const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }, // Reference to Agent
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);