import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.resolve(__dirname, 'db.json');

// Read the JSON file
const readDB = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

// Write to the JSON file
const writeDB = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

const router = express.Router();

router.get('/user', (req, res) => {
  const db = readDB();
  const { username } = req.query;
  const user = db.users.find(u => u.username === username);
  res.json(user ? [user] : []);
});

router.post('/user', (req, res) => {
  const db = readDB();
  const newUser = req.body;
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

router.get('/leaves', (req, res) => {
  const db = readDB();
  res.json(db.leaves);
});

router.post('/leaves', (req, res) => {
  const db = readDB();
  const newLeave = req.body;
  newLeave.id = db.leaves.length ? db.leaves[db.leaves.length - 1].id + 1 : 1;
  db.leaves.push(newLeave);
  writeDB(db);
  res.status(201).json(newLeave);
});
export default router;