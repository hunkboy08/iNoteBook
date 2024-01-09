import React, { useState, useContext } from 'react'
import noteContext from '../context/noteContext/noteContext';
import { useNavigate } from 'react-router-dom'
const host = "http://localhost:5000";
function Signup(props) {
  const navigate = useNavigate();
  const { sendAlert } = useContext(noteContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })
  const handleSubmit = async (e) => {
    props.updateLoading(10);
    e.preventDefault();
    try {
      props.updateLoading(30);
      if (data.password === data.cpassword) {
        props.updateLoading(40);
        // let response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
        let response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
        })
        props.updateLoading(60);
        response = await response.json();
        props.updateLoading(80);
        if (!response.userToken) {
          if (response.Error)
            sendAlert(response.Error[0].msg, "danger");
          else if (response[0].msg)
            sendAlert(response[0].msg, "danger");
          else
            sendAlert("Please Enter Valid Data", "danger");
        } else {
          props.updateLoading(90);
          sendAlert(response.msg, "success");
          props.updateLoading(100);
          navigate('/login');
        }
      } else {
        sendAlert("Password and Confirm Password Should Be Same!!!", "danger");
      }
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  return (
    <>
      <h1 className='mt-4'>Sign Up To iNotebook To Note Your data</h1>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-2">Name</label>
          <input value={data.name} onChange={onChange} placeholder='Enter Your Name' type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="emailForSignUp" className="form-label fs-2">Email address</label>
          <input value={data.email} onChange={onChange} placeholder='Enter Your Email' type="email" className="form-control" id="emailForSignUp" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label fs-2">Password</label>
          <input value={data.password} onChange={onChange} placeholder='Enter Your Password' type="password" className="form-control" name="password" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label fs-2">Confirm Password</label>
          <input value={data.cpassword} onChange={onChange} placeholder='Enter Your Password' type="password" className="form-control" name="cpassword" id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </>
  )
}

export default Signup
