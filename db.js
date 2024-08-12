// db.js
const mysql = require('mysql'); //Require mysql to be connect

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Darshan@5148', 
  database: 'hotel_management'
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL Database:', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

module.exports = db;
