const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth/admin', require('./routes/authRoutes'));
app.use('/api/agents', require('./routes/agentRoutes')); 
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/auth'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});