import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-primary font-mono tracking-tighter">
          NoteVault
        </h2>
      </div>

      <div className="flex-none">
        <Link to='/create'>
        <button className="btn btn-primary gap-2">
          <Plus size={18} />
          Add Note
        </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
