const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// In-memory task list (you can replace this with a database)
const tasks = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
  }
  res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
