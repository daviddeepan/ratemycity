import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import Swup from "swup";
import SwupParallelPlugin from "@swup/parallel-plugin";

export default function RegisterScreen() {
	const firebase = useFirebase();
	const navigate = useNavigate();
	useEffect(() => {
		if (firebase.isLoggedIn) {
			navigate("/");
		}
	}, [firebase, navigate]);
	const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");

	const swup = new Swup({
		plugins: [new SwupParallelPlugin()],
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("signup thodangi .....");
			await firebase.signupWithEmailAndPassword(email, password);
			console.log("signup kazhjinu");
			navigate("/register-details");
		} catch (error) {
			console.error("Error during sign-up:", error);
		}
	};

	return (
		<main id="swup" className="transition-slide">
			<div className="container mt-5 ">
				<h2 className="mt -5 mb-5">New User ? Come on In !</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type="email"
							placeholder="Enter email"
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={(e) => {
								setpassword(e.target.value);
							}}
							type="password"
							placeholder="Password"
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</main>
	);
}
