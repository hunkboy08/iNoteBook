import React, { useContext, useEffect,useState,useRef } from 'react';
import NoteItem from './NoteItem';
import noteContext from '../context/noteContext/noteContext';
import EditNote from './EditNote';
import { useNavigate } from 'react-router-dom';
function GetNote() {
    const navigate = useNavigate();
    const { notes, getNotes ,sendAlert} = useContext(noteContext);
    const [noteForEdit,setNoteForEdit] = useState({title:"",description:"",tag:""});
    const ref = useRef();
    useEffect(() => {
        if(!localStorage.getItem('auth-token')){
            sendAlert("Please Login/Signup First","danger");
            navigate('/login');
        }else{
            try{
                getNotes();
            }catch(err){
                sendAlert("Something Went Wrong,Please Login Again","danger");
                navigate('/login');
            }
        }
        //eslint-disable-next-line
    }, []);
    const updateNote = (note)=>{
        ref.current.click();
        setNoteForEdit(note);
    }
    return (
        <>
            <button ref={ref}  data-bs-toggle="modal" data-bs-target="#exampleModalCenter"  style={{display:'none'}}></button>
            <EditNote note={noteForEdit}/>
            <div className="container mb-3">
                <h2 className="my-5">Your Notes</h2>
                <div className='row'>
                    {!notes || notes.length===0?<div className='mr-5 fs-4'>No Notes Are Available</div>
                    :
                    notes.map((note, key) => {
                        return (
                            <NoteItem key={key} note={note} updateNote={updateNote} />
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default GetNote
