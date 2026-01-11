import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-base-300 border-b border-base-content/10 ">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">NoteVault</h1>
          <div className="flex item-center gap-4">
            <Link to='/create' className="btn btn-primary">
            <Plus size={12} />
              <span>Add Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
