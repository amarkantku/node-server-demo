const Todos = require('../models/todos');

const { ObjectId } = require('mongodb');


const getAllTodos = async (req, res) => {
    const todos = await Todos.find({});        
    res.json({
        noOfRecord: todos.length,
        data: todos
    });
}

const getTodo = async (req, res) => {
    const todoId = ObjectId(req.params.id);
    const todo = await Todos.findById(todoId);
    if(todo === null) {
        res.json({
            message: 'no record'
        });
    } else {
        res.json(todo);
    }
}

const createTodos = async (req, res) => {
    const todo = await new Todos({ 
        name: req.body.name,
        description: req.body.description
     });

    const result = await todo.save();
    res.json(result);
}

const updateTodo = async (req, res) => {

    const todoId = ObjectId(req.params.id);

    const todo = await Todos.findOneAndUpdate({_id: todoId},{
        name: req.body.name,
        description: req.body.description,
    },{
        new:true // to return updated record.
    })
    res.json(todo);
}

const deleteTodo = async (req, res) => {
    const todoId = ObjectId(req.params.id);
    const result = await Todos.deleteOne({_id: todoId});

    if(result.acknowledged && result.deletedCount) {
        res.json({
            message: 'deleted'
        });
    } else {
        res.json({
            message: 'todo doesn\'t exist'
        });
    }
}


module.exports = {
    getAllTodos,
    getTodo,
    createTodos,
    updateTodo,
    deleteTodo
};
