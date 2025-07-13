const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects.routes');
const issueRoutes = require('./routes/issue.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Bug Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/issues', issueRoutes);

app.use(errorHandler); // catch-all error handler

module.exports = app;
