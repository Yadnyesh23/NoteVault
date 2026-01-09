import mongoose from "mongoose";
import { Note } from "../models/notes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// @desc Get all notes
// @route GET /api/v1/notes
//@access public
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  if (notes.length === 0) {
    throw new ApiError(404, "Notes note found !");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Fetched All Notes Successfully.", [`Total Notes : ${notes.length}`,notes]));
});

// @desc Get note by id
// @route GET /api/v1/notes/:id
//@access public
const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID");
  }

  const note = await Note.findById(id);

  if (!note) {
    throw new ApiError(404, "Note note found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Fetched Note Successfully.", note));
});

// @desc Create a note
// @route POST /api/v1/notes
//@access public
const createNote = asyncHandler(async (req, res) => {
 
  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim()) {
    throw new ApiError(400, "All fields are required.");
  }

  const note = await Note.create({
    title,
    content,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Note Created Successfully.", note));
});

// @desc update note
// @route PATCH /api/v1/notes/:id
//@access public
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID");
  }
 

  if (!title?.trim() && !content?.trim()) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const note = await Note.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (title) note.title = title.trim();
  if (content) note.content = content.trim();
  const updatedNote = await note.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Note Updated Successfully", updatedNote));
});

// @desc delete note
// @route DELETE /api/v1/notes/:id
//@access public
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID");
  }

  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  res.status(200).json(new ApiResponse(200, "Note Deleted Successfully"));
});

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
