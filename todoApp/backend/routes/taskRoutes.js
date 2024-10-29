const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize('None', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

// Controllers (Assuming controllers are defined in separate files)
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// GET /tasks - Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// POST /tasks - Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id - Update an existing task
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await deleteTask(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
