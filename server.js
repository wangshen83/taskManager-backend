const express = require('express');
const app = express();
const db = require('./db');
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});