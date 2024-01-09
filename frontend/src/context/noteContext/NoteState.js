import { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const {sendAlert}=props;
  // const host = process.env.REACT_APP_HOST;
  const host = "http://localhost:5000";
  const apiCall = async (method, url, body) => {
    let response;
    try {
      if (method === "GET" || method === "DELETE") {
        response = await fetch(`${host}${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('auth-token')
          }
        });
      } else {
        response = await fetch(`${host}${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('auth-token'),
          },
          body: JSON.stringify(body)
        });
      }
      const data = await response.json();
      return data;
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
  }

  const [notes, setNotes] = useState([]);

  //Add A Note
  const addNote = async (title, description, tag) => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      if (!(title && description))
        sendAlert("Please Enter Data", 'primary', false);
      else if (title.length < 3)
        sendAlert("Title Should Have Minimum Length 3", 'primary', false);
      else if (description.length < 5)
        sendAlert("Description Should Have Minimum Length 5", 'primary', false);
      else {
        props.updateLoading(40);
        const response = await apiCall("POST", "/api/note/addnote", { title, description, tag });
        props.updateLoading(60);
        if (!response.user)
          sendAlert(response, 'secondary');
        else {
          props.updateLoading(80);
          setNotes(notes.concat({ title, tag, description, "date": Date.now() }));
          sendAlert("Note Added Successfully", "success");
          props.updateLoading(100);
        }
      }
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  //Get All Note
  const getNotes = async () => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      const notes = await apiCall("GET", "/api/note/getnotes", "");
      props.updateLoading(60);
      setNotes(notes);
      props.updateLoading(80);
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  //Edit A Note
  const editNote = async (id, title, description, tag) => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      if (!(title && description))
        sendAlert("Please Enter Data", 'primary', false);
      else if (title.length < 3)
        sendAlert("Title Should Have Minimum Length 3", 'primary', false);
      else if (description.length < 5)
        sendAlert("Description Should Have Minimum Length 5", 'primary', false);
      else {
        props.updateLoading(40);
        let response = await apiCall("PUT", `/api/note/updatenote/${id}`, { title, description, tag });
        props.updateLoading(60);
        if (!response.user) {
          alert(response);
        } else {
          props.updateLoading(80);
          let newNote = JSON.parse(JSON.stringify(notes));
          for (let i = 0; i < newNote.length; i++) {
            if (newNote[i]._id === id) {
              newNote[i].title = title;
              newNote[i].description = description;
              newNote[i].tag = tag;
              break;
            }
          }
          props.updateLoading(90);
          setNotes(newNote);
          props.updateLoading(100);
          sendAlert("Note Updated Successfully", "success");
        }
      }
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  //Delete A Note
  const deleteNote = async (id) => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      await apiCall("DELETE", `/api/note/deletenote/${id}`, "");
      props.updateLoading(40);
      const newNote = notes.filter((note) => { return note._id !== id });
      props.updateLoading(60);
      setNotes(newNote);
      props.updateLoading(80);
      sendAlert("Note Deleted Successfully", "success");
      props.updateLoading(100);
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  return (
    <noteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote,sendAlert,setNotes}}>
      {props.children}
    </noteContext.Provider>

  );
}
export default NoteState;