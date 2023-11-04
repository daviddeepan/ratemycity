import { React } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import CityApi from "../components/cityapi";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";

import { useFirebase } from "../context/firebase";

function RegisterDetailScreen() {
	const firebase = useFirebase();
	const navigate = useNavigate();

	const schema = yup.object().shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		username: yup
			.string()
			.required()
			.test(
				"userNameServerValidation",
				"Username already in use",
				async function (username) {
					try {
						const isUserNameTaken = await firebase.validateUserName(
							username
						);
						if (isUserNameTaken === false) {
							throw new yup.ValidationError(
								"Username already in use",
								username,
								"username"
							);
						} else {
							return true;
						}
					} catch (error) {
						throw new yup.ValidationError(
							`ERROR: Unexpected error occurred while validating username (${error}).`,
							username,
							"username"
						);
					}
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
				setFieldValue,
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

								<CityApi setFieldValue={setFieldValue} />
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
