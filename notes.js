// notes.js

import express from 'express';
import { query } from './database/db.js';

const router = express.Router();

// Membuat notes baru
router.post('/notes', async (req, res) => {
  const { title, datetime, note } = req.body;
  try {
    const result = await query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note]);
    res.status(201).send({ id: result.insertId, title, datetime, note });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Menampilkan semua notes
router.get('/notes', async (req, res) => {
    try {
      const results = await query('SELECT * FROM notes');
      res.status(200).send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// Menampilkan salah satu notes berdasarkan id
router.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await query('SELECT * FROM notes WHERE id = ?', [id]);
    if (results.length === 0) {
      res.status(404).send('Note not found');
    } else {
      res.status(200).send(results);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Mengubah notes
router.put('/notes', async (req, res) => {
    const { id, title, datetime, note } = req.body;
    try {
      await query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, id]);
      res.status(200).send('Note updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// Menghapus notes 
router.delete('/notes', async (req, res) => {
  const { id } = req.body;
  try {
    await query('DELETE FROM notes WHERE id = ?', [id]);
    res.status(200).send('Note deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
