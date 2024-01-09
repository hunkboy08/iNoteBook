import React,{useState,useContext,useEffect,useRef} from 'react'
import noteContext from '../context/noteContext/noteContext';
function EditNote(props) {
    const ref = useRef(null);
    const [note,setNote] = useState(props.note);
    const {editNote} = useContext(noteContext);
    useEffect(()=>{
        setNote(props.note);
    },[props.note]);
    const handleChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    const handleEdit = ()=>{
        editNote(note._id,note.title,note.description,note.tag);
        if(note.title.length>=3 && note.description.length>=5)
            ref.current.click();
    }
    return (
        <>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <i className="close fa fa-times" data-bs-dismiss="modal" aria-label="Close" style={{ cursor: 'pointer' }}></i>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label fs-5">New Title</label>
                                <input onChange={handleChange} value = {note.title}  type="text" className="form-control" id="title" name="title" placeholder="Enter Your Title" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label fs-5">New Description</label>
                                <input onChange={handleChange} value = {note.description}  type="text" className="form-control" id="description" name="description" placeholder="Enter Your Description" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label fs-5">New Tag</label>
                                <input onChange={handleChange} value = {note.tag}  type="text" className="form-control" id="tag" name="tag" placeholder="Enter Your Tag" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
                            <button ref={ref} data-bs-dismiss="modal" style={{display:'none'}}></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNote
