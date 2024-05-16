const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all positions
router.get('/all', (_, res) => {
    db.query('SELECT * FROM positions', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/', async (_, res) => {
    try {
        const queryResult = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    positions.id AS position_id,
                    positions.title,
                    positions.description,
                    positions.status,
                    candidates.id AS candidate_id,
                    candidates.name AS candidate_name
                FROM 
                    positions
                LEFT JOIN 
                    candidates ON positions.id = candidates.position_id;
            `, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });


        // Transform the flat result set into a nested structure
        const positionsMap = queryResult.reduce((acc, row) => {
            const {
                position_id,
                title,
                description,
                status,
                candidate_id,
                candidate_name
            } = row;

            if (!acc[position_id]) {
                acc[position_id] = {
                    id: position_id,
                    title,
                    description,
                    status,
                    candidates: []
                };
            }

            if (candidate_id) {
                acc[position_id].candidates.push({
                    id: candidate_id,
                    name: candidate_name
                });
            }

            return acc;
        }, {});

        const result = Object.values(positionsMap);
        res.json(result);
    } catch (error) {
        console.error('Error fetching positions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get a single position by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM positions WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

// Create a new position
router.post('/', (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO positions (title, description) VALUES (?, ?)', [title, description], (error) => {
        if (error) throw error;
        res.sendStatus(201);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    db.query('UPDATE positions SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE candidates SET position_id = NULL WHERE position_id = ?', [id], (error) => {
        if (error) throw error;

        db.query('DELETE FROM positions WHERE id = ?', [id], (error) => {
            if (error) throw error;
            res.sendStatus(204);
        });
    });
});



module.exports = router;
