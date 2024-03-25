// ============ REGISTRATION PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import '../styles/Registration.css';


const Registration = () => {
	const [formData, setFormData] = useState({
		email: '',
		phoneNumber: '',
		firstName: '',
		lastName: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://127.0.0.1:8000/users/create', formData);
			console.log(response.data);
			handleReset();
		} catch (error) {
			console.error('Error when submitting form:', error);
		}
	};

	const handleReset = () => {
		setFormData({
			email: '',
			phoneNumber: '',
			firstName: '',
			lastName: '',
			password: '',
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='email'>Email:</label>
			<input id='email' type='email' name='email' value={formData.email} onChange={handleChange} />

			<label htmlFor='phoneNumber'>Phone Number:</label>
			<input id='phoneNumber' type='tel' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />

			<label htmlFor='firstName'>First Name:</label>
			<input id='firstName' type='text' name='firstName' value={formData.firstName} onChange={handleChange} />

			<label htmlFor='lastName'>Last Name:</label>
			<input id='lastName' type='text' name='lastName' value={formData.lastName} onChange={handleChange} />

			<label htmlFor='password'>Password:</label>
			<input id='password' type='password' name='password' value={formData.password} onChange={handleChange} />

			<input id='submit' type='submit' name='submit' />
			<input id='reset' type='reset' name='reset' onClick={handleReset} />
		</form>
	);
};

export default Registration;
