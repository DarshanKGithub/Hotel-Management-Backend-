const express = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); // Import JWT
const db = require('./db'); 

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'happybdayDk';

router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    console.log(`Login attempt for email: ${email}`);
  
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
  
      if (results.length === 0) {
        console.log('User not found');
        return res.status(400).send({ message: 'Invalid email or password' });
      }
  
      const user = results[0];
  
      const isMatch = bcrypt.compareSync(password, user.password);
  
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(400).send({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  
      console.log('Login successful, token generated');
      res.send({ message: 'Login successful', token });
    });
  });
module.exports = router;
