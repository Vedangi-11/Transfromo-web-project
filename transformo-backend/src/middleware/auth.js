const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Ensure correct path
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Access denied. No valid token provided.' });
    }
    try {
        const tokenValue = token.split(' ')[1];
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Invalid token: User not found.' });
        }
        next();
    } catch (error) {
        console.error('JWT Error:', error);
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = { authenticate };
