const db = require('../config/db');

const findUserByUsername = (username) => {
    return db('users').where({ username }).first();
}

const createUser = (user) => {
    return db('users').insert(user);
}

module.exports = {
    findUserByUsername,
    createUser,
};