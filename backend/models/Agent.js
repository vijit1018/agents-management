const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
      },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        default: null // Null if created by admin
      }
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);