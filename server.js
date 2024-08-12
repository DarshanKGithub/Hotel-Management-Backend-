const express = require('express');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
const registerRouter = require('./register'); // Import your register router
const loginRouter = require('./login'); // Import your login router

const app = express();

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
}));

app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Use the routers
app.use('/api', registerRouter);
app.use('/api', loginRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
