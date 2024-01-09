import { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import NoteState from './context/noteContext/NoteState';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetails from './components/UserDetails';
import LoadingBar from 'react-top-loading-bar';
const App = () => {
	const [progress, setProgress] = useState(0);
	const [myAlert, setMyAlert] = useState({ isAlert: false });
	const sendAlert = (message, type, confirm, id) => {
		setMyAlert({
			message,
			type,
			confirm,
			id,
			isAlert: true
		})
		if (!confirm) {
			setTimeout(removeAlert, 1000);
		}
	}
	const removeAlert = () => {
		setMyAlert({
			message: "",
			type: "",
			confirm: false,
			id: "",
			isAlert: false
		});
	}
	const updateLoading = (val) => {
		setProgress(val);
	}
	return (
		<NoteState updateLoading={updateLoading} sendAlert={sendAlert}>
			<Router>
				<Navbar />
				<LoadingBar color='blue' progress={progress} />
				{myAlert.isAlert && <Alert message={myAlert.message} type={myAlert.type} confirm={myAlert.confirm} removeAlert={removeAlert} id={myAlert.id} />}
				<div className="container">
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login updateLoading={updateLoading} />} />
						<Route exact path="/signup" element={<Signup updateLoading={updateLoading} />} />
						<Route exact path="/about" element={<About />} />
						<Route exact path="/userdetails" element={<UserDetails updateLoading={updateLoading} />} />
					</Routes>
				</div>
			</Router>
		</NoteState>
	)
}
export default App;