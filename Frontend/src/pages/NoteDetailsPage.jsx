import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import {  ArrowLeftIcon, Loader2Icon, Trash2Icon } from "lucide-react";
function NoteDetails(){
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(()=> {
        const fetchNotes = async() => {
            try {
                const res = await axios.get(`http://localhost:5001/api/v1/notes/${id}`)
                setNote(res.data.data)
                console.log(res.data.data);
            } catch (error) {
                console.log(`Failed to fetch note. : ` , error.message);
                toast.error("Failed to fetch note.")
            }finally{
                setLoading(false)
            }
        }

        fetchNotes()
    } , [id])

    if(loading){
        return (
            <div className="min-h-screen bg-base-200 flex item-center justify-center">
                <Loader2Icon className="animate-spin size-10"/>
            </div>
        )
    }
    
    const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
        await axios.delete(`http://localhost:5001/api/v1/notes/${id}`);
        toast.success("Note deleted successfully");
        navigate("/");
    } catch (error) {
        console.error("Delete failed:", error.message);
        toast.error("Failed to delete note");
    }
};


    const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
        toast.error("Title and content cannot be empty");
        return;
    }

    try {
        setSaving(true);
        await axios.patch(`http://localhost:5001/api/v1/notes/${id}`, {
            title: note.title,
            content: note.content,
        });
        navigate('/')
        toast.success("Note updated successfully");

    } catch (error) {
        console.error("Save failed:", error.message);
        toast.error("Failed to save changes");
    } finally {
        setSaving(false);
    }
};


    return(
        <div className="min-h-screen bg-base-200">
           <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-2xl">
                <div className="flex item-center justify-between mb-6">
                    <Link to='/' className="btn btn-ghost">
                    <ArrowLeftIcon className='h-5 w-5'/>
                    Back to notes
                    </Link>
                    <button className="btn btn-error btn-outline" onClick={handleDelete}>
                        <Trash2Icon className="h-5 w-5"/>
                        Delete
                    </button>
                </div>
                <div className="card bg-base-100">
                    <div className="card-body">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">
                                    Title
                                </span>
                            </label>
                            <input type="text" placeholder="Note title" className="input input-bordered" value={note.title} onChange={(e) => setNote({...note, title:e.target.value})} />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">
                                    Content
                                </span>
                            </label>
                            <input type="text" placeholder="Write your note here" className="input input-bordered" value={note.content} onChange={(e) => setNote({...note, content:e.target.value})} />
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
                </div>
           </div>
          </div>
    )
}

export default NoteDetails;