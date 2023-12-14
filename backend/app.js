require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,     // MySQL host
  user: process.env.DATABASE_USER,     // MySQL username
  password: process.env.DATABASE_PASSWORD, // MySQL password
  database: process.env.DATABASE_DB, // MySQL database
  port: process.env.DATABASE_PORT, // MySQL port
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

app.post('/createUser', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const query = `INSERT INTO users 
    (username, password)
    VALUES 
    (?, ?)`;
    const values = [username, hashedPassword];

    //Use a Promise to make the callback-based function compatible with async/await
    const insertUser = () => {
      return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error executing the query: ' + err.stack);
            reject(err);
            return;
          }
          console.log('Inserted new user into the database');
          resolve(results);
        });
      });
    };

    //await to wait for the asynchronous database operation to complete
    await insertUser();

    res.send('Successful user creation');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    const values = [username, hashedPassword];

    //Use a Promise to make the callback-based function compatible with async/await
    const logInUser = () => {
      return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error executing the query: ' + err.stack);
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    };

    //await to wait for the asynchronous database operation to complete
    await logInUser();

    res.send('Successful user creation');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/enterItem', (req, res) => {
  const { item, amount, username, date } = req.body;

  const query = `INSERT INTO finances
  (username, item, amount)
  VALUES
  (?, ?, ?)`

  const values = [username, item, amount];
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      return;
    }
    console.log('Inserted new item into the database');
    res.send('Item added successfully');
  });
})


app.get('/api/data', (req, res) => {

  const { username } = req.query;
  const query = 'SELECT * FROM finances WHERE username = ?';
  const values = [username];
  
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json({ data: results });
  });
});

app.get('/api/total', (req, res) => {
  const { username } = req.query;
  const query = 'SELECT sum(amount) AS total FROM finances WHERE username = ?';
  const values = [username];
  
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      res.status(500).json({ error: 'Error fetching total' });
      return;
    }
    res.json({ data: results });
  });
});

app.delete('/deleteEntry', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing id in the request body' });
  }

  const query = 'DELETE FROM finances WHERE id = ?';
  const values = [id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      return res.status(500).json({ error: 'Error deleting entry' });
    }
    console.log('Deleted item');
    res.status(200).json({ success: 'Item deleted successfully' });
  });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
