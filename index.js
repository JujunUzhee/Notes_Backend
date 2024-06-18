// index.js

import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './database/db.js';
import notesRouter from './notes.js';

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
 app.use(notesRouter);

app.listen(PORT, () => {
    testConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
