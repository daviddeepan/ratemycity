import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";

import { useFirebase } from "../context/firebase";
import { use } from "swup/dist/types/modules/plugins";

function RegisterDetailScreen() {
	const firebase = useFirebase();
	const navigate = useNavigate();

	// useEffect(() => {
	// 	firebase.getUserProfile().then((profile) => {
	// 		console.log(profile.docs[0].data());
	// 	});
	// }, []);

	const schema = yup.object().shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		city: yup.string().required(),
		username: yup
			.string()
			.required()
			.test(
				"userNameServerValidation",
				"Username already in use", // <- key, message
				function (username) {
					return new Promise((resolve, reject) => {});
				}
			),
	});

	return (
		<Formik
			validationSchema={schema}
			initialValues={{
				firstName: "",
				lastName: "",
				city: "",
				username: "",
			}}
			onSubmit={async (values) => {
				try {
					console.log("data thodangi .....");
					await firebase.putUserProfile(
						values.firstName,
						values.lastName,
						values.city,
						values.username
					);

					console.log("data kazhjinu");
				} catch (error) {
					console.log(error);
				}
			}}
			validateOnChange={false}
		>
			{({
				handleSubmit,
				handleChange,
				values,
				touched,
				errors,
				isSubmitting,
			}) => (
				<div className="container">
					<h2 className="m-5 p-5">Complete Registration</h2>
					<Form
						noValidate
						onSubmit={handleSubmit}
						className="m-5 p-5"
					>
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md="4"
								controlId="validationFormik01"
							>
								<Form.Label>First name</Form.Label>
								<Form.Control
									type="text"
									name="firstName"
									value={values.firstName}
									onChange={handleChange}
									isInvalid={
										touched.firstName && !!errors.firstName
									}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.firstName}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group
								as={Col}
								md="4"
								controlId="validationFormik02"
							>
								<Form.Label>Last name</Form.Label>
								<Form.Control
									type="text"
									name="lastName"
									value={values.lastName}
									onChange={handleChange}
									isInvalid={
										touched.lastName && !!errors.lastName
									}
								/>

								<Form.Control.Feedback type="invalid">
									{errors.lastName}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group
								as={Col}
								md="4"
								controlId="validationFormikUsername"
							>
								<Form.Label>Username</Form.Label>
								<InputGroup hasValidation>
									<InputGroup.Text id="inputGroupPrepend">
										@
									</InputGroup.Text>
									<Form.Control
										type="text"
										placeholder="Username"
										aria-describedby="inputGroupPrepend"
										name="username"
										value={values.username}
										onChange={handleChange}
										isInvalid={
											touched.username && errors.username
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.username}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md="6"
								controlId="validationFormik03"
							>
								<Form.Label>City</Form.Label>
								<Form.Control
									type="text"
									name="city"
									value={values.city}
									onChange={handleChange}
									isInvalid={!!errors.city}
								/>

								<Form.Control.Feedback type="invalid">
									{errors.city}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Button type="submit" disabled={isSubmitting}>
							Submit form
						</Button>
					</Form>
				</div>
			)}
		</Formik>
	);
}

export default RegisterDetailScreen;
