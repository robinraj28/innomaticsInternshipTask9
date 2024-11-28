// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// POST /todos - Create a New To-Do
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const todo = new Todo({
            title,
            description,
            completed: false
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /todos - Retrieve All To-Dos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /todos/:id - Retrieve a To-Do by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'To-do not found' });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /todos/:id - Update a To-Do by ID
router.put('/:id', async (req, res) => {
    const { title, description, completed } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ error: 'To-do not found' });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /todos/:id - Delete a To-Do by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: 'To-do not found' });
        res.status(200).json({ message: 'To-do item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;