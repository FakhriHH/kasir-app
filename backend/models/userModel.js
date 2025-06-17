const db = require('../config/db');

const findUserByUsername = (username) => {
    return db('users').where({ username }).first();
}

const createUser = (user) => {
    return db('users').insert(user);
}

const findUserById = (id) => db('users').where({ id }).first();
const findAllUsers = () => db('users').select('id', 'username', 'role', 'created_at');
const updateUser = (id, userData) => db('users').where({ id }).update(userData);
const deleteUser = (id) => db('users').where({ id }).del();

module.exports = {
    findUserByUsername,
    createUser,
    findUserById,
    findAllUsers,
    updateUser,
    deleteUser,
};