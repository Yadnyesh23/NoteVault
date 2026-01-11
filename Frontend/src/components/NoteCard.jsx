import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

function NoteCard({ note, setNotes }) {

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // 🔥 IMPORTANT

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`/api/v1/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-[#00FF9D]">

      <Link to={`/notes/${note._id}`} className="card-body">
        <h3 className="card-title text-base-content line-clamp-1">
          {note.title}
        </h3>

        <p className="text-base-content/70 line-clamp-3">
          {note.content}
        </p>
      </Link>

      <div className="card-actions justify-between items-center px-6 pb-4">
        <span className="text-sm text-base-content/60">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-1">
          <Link
            to={`/notes/${note._id}`}
            className="btn btn-ghost btn-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <PenSquareIcon className="size-4" />
          </Link>

          <button
            className="btn btn-ghost btn-sm text-error"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
