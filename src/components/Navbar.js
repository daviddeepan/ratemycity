import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/firebase";


function NavBar() {
	const firebase = useFirebase();

	//swup transition for slide-show

	


	const authencticatedLinks = (
		<Nav>
			<Nav.Link href="#">Profile</Nav.Link>
			<Nav.Link href="/login" onClick={() => firebase.signOutUser()}>
				Logout
			</Nav.Link>
		</Nav>
	);

	const unAuthencticatedLinks = (
		<Nav>
			<Nav.Link href="/login">Login</Nav.Link>
			<Nav.Link href="/register">Register</Nav.Link>
		</Nav>
	);

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">ratemycity!</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav"
					className="justify-content-end"
				>
					{console.log(firebase.isLoggedIn)}
					{firebase.isLoggedIn
						? authencticatedLinks
						: unAuthencticatedLinks}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
