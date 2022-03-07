// const Users = require('../models/users');
const { ObjectId } = require('mongodb');

const getAllTodos = async (req, res, next) => { 
    const userId = req.params.id;     
    res.json({
        message: 'This is all todos ' + userId
    });
}

const getTodo = async (req, res, next) => { 
    const userId = req.params.id;     
    const todoId = req.params.todoId;
    res.json({
        message: 'This is all todos ' + userId + '  ' + todoId
    });
}


module.exports = {
    getAllTodos,
    getTodo
};
