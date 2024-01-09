import { useContext } from "react";
import noteContext from "../context/noteContext/noteContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
	const navigate = useNavigate();
	const { sendAlert } = useContext(noteContext);
	const location = useLocation().pathname;
	const handleLogout = () => {
		sendAlert("Confirm Logout?", "danger", true, "logout");
	}
	const handleUserDetails = async () => {
		navigate("/userdetails");
	}
	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">iNotebook</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link ${location === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location === "/about" ? "active" : ""}`} to="/about">About</Link>
						</li>
					</ul>
					{!localStorage.getItem("auth-token") ? <div className="d-flex mx-1" role="search">
						<Link className="btn btn-primary mx-1" to="/login">Login</Link>
						<Link className="btn btn-primary mx-1" to="/signup">Sign up</Link>
					</div> : <>
						<button onClick={handleUserDetails} className="btn btn-primary mx-2">Get My Details</button>
						<button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>
					</>
					}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;