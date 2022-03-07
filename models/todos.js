const mongoose = require('mongoose')

const TodoSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Todos = mongoose.model('Todos', TodoSchema);

module.exports = Todos;

