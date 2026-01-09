import Router from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/notes.controller.js';
const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.patch('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export {router};