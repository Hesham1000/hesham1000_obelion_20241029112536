const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user, created] = await sequelize.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      {
        replacements: [email, hashedPassword],
        type: sequelize.QueryTypes.INSERT
      }
    );
    if (created) {
      res.status(201).json({ message: 'Registration successful! Please check your email for verification.' });
    } else {
      res.status(400).json({ message: 'Registration failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await sequelize.query(
      'SELECT * FROM users WHERE email = ?',
      {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT
      }
    );
    const user = users[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

module.exports = router;
