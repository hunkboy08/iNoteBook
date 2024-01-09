import React, { useState, useContext, useRef } from 'react'
import noteContext from '../context/noteContext/noteContext';
import { useNavigate } from 'react-router-dom'
const host = "http://localhost:5000";
function Login(props) {
    const navigate = useNavigate();
    const { sendAlert } = useContext(noteContext);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        props.updateLoading(10);
        e.preventDefault();
        try {
            props.updateLoading(30);
            // let response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
            let response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            props.updateLoading(50);
            response = await response.json();
            props.updateLoading(70);
            if (!response.userToken) {
                props.updateLoading(50);
                sendAlert(response[0].msg, "danger");
            } else {
                props.updateLoading(90);
                localStorage.setItem('auth-token', response.userToken);
                sendAlert("Login Successfully", "success");
                props.updateLoading(100);
                navigate('/');
            }
        } catch (err) {
            props.updateLoading(50);
            sendAlert("Something Went Wrong!!!", "danger");
        }
        props.updateLoading(100);
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const ref = useRef();
    const toggleView = () => {
        const closeEye = document.getElementById('closeEye');
        const openEye = document.getElementById('openEye');
        if (openEye.style.display === 'none') {
            ref.current.type = 'text';
            closeEye.style.display = 'none';
            openEye.style.display = 'inline';
        } else {
            ref.current.type = 'password';
            closeEye.style.display = 'inline';
            openEye.style.display = 'none';
        }
    }
    return (
        <>
            <h1 className='mt-4'>Login To iNotebook To Access Your Note</h1>
            <form onSubmit={handleSubmit} className="my-3">
                <div className="mb-3">
                    <label htmlFor="emailForLogin" className="form-label fs-2">Email address</label>
                    <input name="email" value={data.email} onChange={onChange} type="email" className="form-control" id="emailForLogin" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label fs-2">Password</label>
                    <i id="closeEye" onClick={toggleView} style={{ display: 'inline', position: 'relative', bottom: '3px', left: '15px', cursor: 'pointer' }} className='fa fa-eye-slash'></i>
                    <i id="openEye" onClick={toggleView} style={{ display: 'none', position: 'relative', bottom: '3px', left: '15px', cursor: 'pointer' }} className='fa fa-eye'></i>
                    <input ref={ref} name="password" value={data.password} onChange={onChange} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    )
}

export default Login
