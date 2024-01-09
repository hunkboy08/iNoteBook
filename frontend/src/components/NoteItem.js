import React, { useContext} from 'react'
import noteContext from '../context/noteContext/noteContext'
function NoteItem(props) {
    const { sendAlert } = useContext(noteContext);
    const handleDelete = () => {
        const body = document.querySelector('body');
        body.style.overflowY = 'hidden';
        sendAlert("Confirm Deleting The Note?", "danger", true, props.note._id);
    }
    return (
        <>
            <div className="card col-md-4 m-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Title : {props.note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Tag : {props.note.tag}</h6>
                    <p className="card-text">Description : {props.note.description}</p>
                    <p href="#" className="card-link">Added On : {new Date(props.note.date).toString().slice(0,25).concat("IST")}</p>
                    <i className="fa fa-pencil-square-o" onClick={()=>{props.updateNote(props.note)}} style={{ marginRight: '20px', cursor: 'pointer' }}></i>
                    <i className="fa fa-trash-o" onClick={handleDelete} style={{ cursor: 'pointer' }}></i>
                </div>
            </div>
        </>
    )
}

export default NoteItem
