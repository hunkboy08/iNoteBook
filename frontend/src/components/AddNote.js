import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext/noteContext'

function AddNote() {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({
        title: "",
        tag: "",
        description: ""
    });
    const handleAdding = (e) => {
        e.preventDefault();//this will prevent loading of the page
        addNote(note.title, note.description, note.tag);
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const tag = document.getElementById('tag');
        if (title.value.length >= 3 && description.value.length >= 5) {
            title.value = "";
            description.value = "";
            tag.value = "";
            setNote({
                title: "",
                tag: "",
                description: ""
            })
        }
    }
    const handleChange = (e) => {
        //this will overwrite the key with the given value
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3">
            <h2>Add A Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fs-5">Title</label>
                    <input onChange={handleChange} type="text" className="form-control" id="title" name="title" placeholder="Enter Your Title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-5">Description</label>
                    <input onChange={handleChange} type="text" className="form-control" id="description" name="description" placeholder="Enter Your Description" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label fs-5">Tag</label>
                    <input onChange={handleChange} type="text" className="form-control" id="tag" name="tag" placeholder="Enter Your Tag" />
                </div>

                <button type="submit" onClick={handleAdding} className="btn btn-outline-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
