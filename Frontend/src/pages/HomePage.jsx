import React, { useEffect, useState } from "react";
import Header from "./Header";
import RateLimited from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

function HomePage() {
  const [IsRateLimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/v1/notes");

        const notesFromApi = res.data.data[1];

        setNotes(notesFromApi);
        setIsRatelimited(false);
        console.log(notesFromApi);
      } catch (error) {
        console.error("Notes fetching error:", error);

        if (error.response?.status === 429) {
          setIsRatelimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Header />
      {IsRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-4xl text-primary py-10">
            Loading Notes ....
          </div>
        )}
        {notes.length === 0 && !IsRateLimited && <NotesNotFound/>}
        {notes.length > 0 && !IsRateLimited && (
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
          
        )}
      </div>
    </div>
  );
}

export default HomePage;
