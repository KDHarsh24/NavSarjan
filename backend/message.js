const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',    // Change to your database host
  user: 'root',         // Your MySQL username
  password: 'harsh2004',         // Your MySQL password
  database: 'navsarjan', // Your database name
});
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL!');
  });

// Routes
app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;
    // Query to fetch user profile based on userId
    console.log(userId)
    const query = `SELECT * from user where userid= ?`;
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching profile:', err);
        return res.status(500).json({ message: 'Error fetching profile' });
      }
      if (result.length > 0) {
        console.log(result)
        res.json(result[0]);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    });
  });

  app.post('/login', (req, res) => {
    const { userId, password } = req.body;
  
    // Query to check if user exists
    const query = 'SELECT * FROM user WHERE userid = ? AND password = ?';
    console.log(userId, password)
    db.query(query, [userId, password], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).send({ success: false, message: 'Internal server error' });
        return;
      }
      console.log(results)
      if (results.length > 0) {
        // User found, login successful
        
        res.status(200).send({ success: true, message: 'Login successful', userdata: results[0] });
      } else {
        // Invalid credentials
        res.status(401).send({ success: false, message: 'Invalid credentials' });
      }
    });
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
