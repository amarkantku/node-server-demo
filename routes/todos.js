const express = require('express');

const router = express.Router();

const TodoController = require('../controller/TodoController');

/**
 * To get all todo list
 */
router.get('/', TodoController.getAllTodos);

/**
 * To get todo by id
 */
router.get('/:id', TodoController.getTodo);

router.post('/', TodoController.createTodos);

router.put('/:id', TodoController.updateTodo);

router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
