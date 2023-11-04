import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";

export default function CityApi({ onCitySelect }) {
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState("");
	const [field, meta] = useField("city");

	const handleCityChange = (event) => {
		const selectedCity = event.target.value;
		setSelectedCity(selectedCity);
		onCitySelect(selectedCity); 
	};

	useEffect(() => {
		try {
			var requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ country: "India", state: "Kerala" }),
				redirect: "follow",
			};

			fetch(
				"https://countriesnow.space/api/v0.1/countries/state/cities",
				requestOptions
			)
				.then((response) => response.json())
				.then((data) => {
					setCities(data.data);
				});
		} catch (error) {
			console.error("General error:", error);
		}
	}, []);

	return (
		<div>
			<Form.Select value={selectedCity} onChange={handleCityChange} {...field} isInvalid={meta.touched && meta.error}>
				<option value="" disabled>
					Choose a city (beta-Kerala)
				</option>
				{cities.map((city, index) => (
					<option key={index}>{city}</option>
				))}
			</Form.Select>
			<Form.Control.Feedback type="invalid">
				{meta.error}
			</Form.Control.Feedback>
		</div>
	);
}
