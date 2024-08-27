import { useEffect, useState } from "react"
import { Note } from "./Note"
import "./NoteLayout.css"
import CreateNote from "./Note.tsx"

export default function NoteLayout() {

    const initialNotes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
    const [notesData, setNotesData] = useState<Note[]>(initialNotes);
    const [search, setSearch] = useState<string>("")   // for searching the notes
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

    // will handle the search function
    const handleSearch = (e: any) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const filteredItems = notesData.filter((note) =>
            note.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredNotes(filteredItems);
    }, [search]);


    // Function to add a new note
    const addNote = (newNote: Note) => {
        const updatedNotes = [newNote, ...notesData];
        setNotesData(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setFilteredNotes(updatedNotes.filter(note =>
            note.title.toLowerCase().includes(search.toLowerCase())
        ));
    };

    return (
        <div className="containermain" id="containermain">

            <div className="container" id="container">
                <div className="searchdiv" id="searchdiv">
                    <input type="text" className="searchbar" id="searchbar"
                        placeholder="Search Note" name="search"
                        value={search} onChange={handleSearch}></input>
                </div>
                <div className="notelayout" id="notelayout">
                    {filteredNotes.map((data, index) => {
                        return (
                            <div className="note" id="note" key={index}>
                                <h2>{data.title}</h2>
                                <p>{data.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="createnotediv" id="createnotediv">
                <CreateNote addNote = {addNote}></CreateNote>
            </div>

        </div>
    )
}

// should contain a basic search bar and filter by tags option in one line
// the layout to be a grid layout 