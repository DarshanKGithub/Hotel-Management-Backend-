// register.js
const express = require('express');
const bcrypt = require('bcryptjs'); //For hashing password
const db = require('./db'); // Import the database connection

const router = express.Router();

// Register API
router.post('/register', (req, res) => {
  const { username, email, phone, password } = req.body;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, phone, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.send({ message: 'User registered successfully' });
  });
});

module.exports = router;
