import React, { useState, useEffect } from 'react'
const host = "http://localhost:5000";

function UserDetails(props) {
  const [data, setData] = useState({});
  const getDetails = async () => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      // let response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/getuser`, {
      let response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      })
      props.updateLoading(50);
      response = await response.json();
      props.updateLoading(80);
      setData({
        name: response.name,
        email: response.email,
        date: response.date
      });
      props.updateLoading(100);
    } catch (err) {
      console.log(err.message);
    }
    props.updateLoading(100);
  }
  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container my-3">
      <h2>My Details</h2>
      <hr />
      <p className='fs-4 mt-5'>My Name &nbsp; : {data.name ? data.name : "Loading"}</p>
      <p className='fs-4'>My Email &nbsp;&nbsp; : {data.email ? data.email : "Loading"}</p>
      <p className='fs-4'>Signup On : {data.date ? new Date(data.date).toString().slice(0, 25).concat("IST") : "Loading"}</p>
    </div>
  )
}

export default UserDetails
