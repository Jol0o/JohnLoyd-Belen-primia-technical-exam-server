const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all candidates for a position
router.get('/', (req, res) => {
    db.query('SELECT * FROM candidates', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Get a single candidate by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM candidates WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

// Create a new candidate
router.post('/', (req, res) => {
    const { name, email, position_id } = req.body;
    db.query(
        'INSERT INTO candidates (name, email , position_id) VALUES (?, ? , ?)',
        [name, email, position_id],
        (error) => {
            if (error) throw error;
            res.sendStatus(201);
        }
    );
});

// Update a candidate
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, position_id } = req.body;
    db.query(
        'UPDATE candidates SET name = ?, email = ?, position_id = ? WHERE id = ?',
        [name, email, position_id, id],
        (error) => {
            if (error) throw error;
            res.sendStatus(200);
        }
    );
});

// Delete a candidate
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('Deleting candidate with ID:', id); // Log the ID
    db.query('DELETE FROM candidates WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        console.log('Deleted rows:', results.affectedRows); // Log the number of deleted rows
        res.sendStatus(204);
    });
});

module.exports = router;