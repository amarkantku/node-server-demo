const express = require('express');

const router = express.Router();

const UsersController = require('../controller/UsersController');


// http://localhost:3000/users/123/todo
router.get('/:id/todo', UsersController.getAllTodos);

// http://localhost:3000/users/123/todo/34
router.get('/:id/todo/:todoId', UsersController.getTodo);


module.exports = router;
