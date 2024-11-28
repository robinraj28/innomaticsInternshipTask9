// index.js
const express = require('express');
const mongoose = require('mongoose');
const todosRoutes = require('./routes/todos');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/todos', todosRoutes);

// Database Connection
console.log('MongoDB URI:', process.env.MONGODB_URI); // Debugging to check if URI is loaded
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Start the Server
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});