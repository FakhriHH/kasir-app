const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = async (req, res) => {
    const { name, username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        await userModel.createUser({ name, username, password: hashed });
        res.status(201).json({ message: 'User created succesfuly' });
    }catch (err) {
        res.status(400).json({ error: 'Username may already exist' });
    }
};

exports.login = async (req, res) => {
    const { name, username, password } = req.body;
    const user = await userModel.findUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'user error' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.json({ token, user: { id: user.id, name: user.name, username: user.username, role: user.role } });
}