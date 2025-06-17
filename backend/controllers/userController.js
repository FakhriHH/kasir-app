const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = async (req, res) => {
    const { name, username, password, role } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);
        await userModel.createUser({ 
            name, 
            username, 
            password: hashed, 
            role: role || 'kasir'
        });
        res.status(201).json({ message: 'User created succesfuly' });
    }catch (err) {
        console.error(err);
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

exports.getMe = async (req, res) => {
  const user = await userModel.findUserById(req.user.id);
  res.json({ user });
};

exports.getAllUsers = async (req, res) => {
  const users = await userModel.findAllUsers();
  res.json({ users });
};

exports.getUserById = async (req, res) => {
  const user = await userModel.findUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
};

exports.updateUser = async (req, res) => {
  const { name, username, password, role } = req.body;
  const userId = Number(req.params.id);

  const targetUser = await userModel.findUserById(userId);
  if (!targetUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (req.user.role !== 'admin' && req.user.id !== userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  if (username) {
    const existing = await userModel.findUserByUsername(username);
    if (existing && existing.id !== userId) {
      return res.status(400).json({ error: 'Username already exists' });
    }
  }

  const hashed = password ? await bcrypt.hash(password, 10) : undefined;

  let roleToUpdate = targetUser.role;
  if (req.user.role === 'admin' && role) {
    roleToUpdate = role;
  }

  const dataToUpdate = {
    name: name ?? targetUser.name,
    username: username ?? targetUser.username,
    password: hashed ?? targetUser.password,
    role: roleToUpdate
  };

  await userModel.updateUser(userId, dataToUpdate);
  res.json({ message: 'User updated' });
};

exports.deleteUser = async (req, res) => {
  const user = await userModel.findUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  await userModel.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful. Please remove token on client." });
};