const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path=require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});
const registeruser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ email, password, username });
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }   
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { registeruser, login };
