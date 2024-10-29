// File Type: Controller

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/UserModel');
const { sequelize } = require('../../models/UserModel');
const { QueryTypes } = require('sequelize');
const path = require('path');

const createUserTable = path.join(__dirname, '../../../database/migrations/create_users_table.sql');
const seedUsers = path.join(__dirname, '../../../database/seeders/seed_users.sql');

sequelize.query(createUserTable, { type: QueryTypes.RAW })
  .then(() => sequelize.query(seedUsers, { type: QueryTypes.RAW }))
  .catch(err => console.error('Error executing SQL files:', err));

exports.register = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
