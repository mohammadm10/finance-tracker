const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); 

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received username:', username);
  console.log('Received password:', password);
  res.send('Login successful');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
