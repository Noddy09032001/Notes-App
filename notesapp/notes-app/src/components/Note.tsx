import { useState } from "react"
import "./notes.css"
import { Note } from "./Note";

interface CreateNoteProps {
    addNote: (newNote: Note) => void;
}

export default function CreateNote({addNote}: CreateNoteProps) {

    // this will be the initial notes data structure
    const NoteData: Note = {
        title: "",
        tags: [],
        description: ""
    }

    const[notes, setNotes] = useState(NoteData);

    const handleChange = (e:any) =>{
        setNotes({
            ...notes,
            [e.target.name]: e.target.value
        })
    }

    const handleClear = () =>{
        setNotes(NoteData)   // resetting the notes data
    }

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        addNote(notes)
        // fetching the notes from the local storage
        /*const existingNotes: Note[] = JSON.parse(localStorage.getItem('notes') || "[]");
        existingNotes.push(notes)   // adding the new note
        localStorage.setItem('notes', JSON.stringify(existingNotes))  // again pushing back the notes
        console.log(existingNotes)   */
    }

    return (
        <div>
            <div className="note-container">
                <div><h3>Note<span> It Up!!!!</span></h3></div>
                <div className="inputdiv" id="inputdiv">
                    <input type="text" className="title" name="title" 
                    placeholder="Title" value={notes.title} onChange={handleChange} />
                </div>
                <div className="desdiv" id="desdiv">
                    <label htmlFor="description">Note Description</label>
                    <textarea rows={25} cols={100} className="description"
                     id="description" placeholder="Description: sample this is my note"
                     name="description" value={notes.description} onChange={handleChange} />
                </div>
                <div className="btndiv" id="btndiv">
                    <button type="submit" className="save-btn" id="save-btn" onClick={handleSubmit}>Save</button>
                    <button type="button" className="clr-btn" id="clr-btn" onClick={handleClear}>Clear</button>
                </div>
            </div>
        </div>
    )
}