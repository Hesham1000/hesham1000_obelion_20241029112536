const { Task } = require('../models/TaskModel');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('None', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

async function createTask(req, res) {
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.create({ title, description, dueDate, priority });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.findByPk(id);
    if (task) {
      await task.update({ title, description, dueDate, priority });
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
