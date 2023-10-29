require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,     // MySQL host
  user: process.env.DATABASE_USER,     // MySQL username
  password: process.env.DATABASE_PASSWORD, // MySQL password
  database: process.env.DATABASE_DB, // Name of your database
  port: process.env.DATABASE_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.post('/createUser', (req, res) => {
  const { username, password } = req.body;

  const query = `INSERT INTO users 
  (username, password)
  VALUES 
  (?, ?)`
  const values = [username, password];
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      return;
    }
    console.log('Inserted new user into the database');
    res.send('Login successful');
  });
})


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received username:', username);
  console.log('Received password:', password);

});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
