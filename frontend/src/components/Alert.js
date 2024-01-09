import React, { useContext } from 'react';
import noteContext from '../context/noteContext/noteContext';
import { useNavigate } from 'react-router-dom';
const Alert = (props) => {
    const { deleteNote,setNotes } = useContext(noteContext);
    const navigate = useNavigate();
    const handleYes = async () => {
        if (props.id === 'logout') {
            localStorage.removeItem('auth-token');
            setNotes([]);
            navigate('/login');
        } else {
            deleteNote(props.id);
        }
        const body = document.querySelector('body');
        body.style.overflowY = 'scroll';
        props.removeAlert();
    }
    const handleNo = () => {
        const body = document.querySelector('body');
        body.style.overflowY = 'scroll';
        props.removeAlert();
    }
    return (
        <div className={`mx-2 alert alert-${props.type}`} role="alert" style={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', alignSelf: 'center', zIndex: '1', top: '10px', left: '0', right: '0' }}>
            <strong>{props.message}</strong>
            {props.confirm
                && <>
                    <br />
                    <button onClick={handleYes} className="btn btn-outline-danger mx-2" style={{ height: '30px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yes</button>
                    <button onClick={handleNo} className="btn btn-outline-danger mx-2" style={{ height: '30px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No</button>
                </>}
        </div>
    )
}
export default Alert;