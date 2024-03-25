// ============ REGISTRATION PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/Registration.css';


const Registration = ({ setPage }) => {
	const [formData, setFormData] = useState({
		email: '',
		phoneNumber: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			console.error('Password do not match');
			return;
		}

		const dataToSend = { ...formData };
		delete dataToSend.confirmPassword;

		try {
			const response = await axios.post('http://127.0.0.1:8000/users/create', dataToSend);
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
		<div className="registration">
			<h1 className="registration__title">Join Us.</h1>
			<form className='registration__form' onSubmit={handleSubmit}>
				<label className='registration__label' htmlFor='firstName'>
					First Name:
					<input
						className='registration__input'
						id='firstName'
						type='text'
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
					/>
				</label>
				<label className='registration__label' htmlFor='lastName'>
					Last Name:
					<input
						className='registration__input'
						id='lastName'
						type='text'
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
					/>
				</label>
				<label className='registration__label' htmlFor='email'>
					* Email:
					<input
						className='registration__input'
						id='email'
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</label>
				<label className='registration__label' htmlFor='phoneNumber'>
					* Phone Number:
					<input
						className='registration__input'
						id='phoneNumber'
						type='tel'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleChange}
						required
					/>
				</label>
				<label className='registration__label' htmlFor='password'>
					* Password:
					<input
						className='registration__input'
						id='password'
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label>
				<label className='registration__label' htmlFor="confirmPassword">
					* Confirm Password:
					<input
						className='registration__input'
						id='confirmPassword'
						type='password'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</label>
				<input className='registration__button' id='submit' type='submit' name='submit' />
				<input className='registration__button' id='reset' type='reset' name='reset' onClick={handleReset} />
				<label className='registration__label' htmlFor='login'>
					Already registered? Click here to login.
					<button className='registration__button' id='login' onClick={() => setPage('Authentication')}>Login</button>
				</label>
			</form>
			<p className='registration__text'>Fields marked with <span>*</span> are required.</p>
		</div>
	);
};

Registration.propTypes = {
	setPage: PropTypes.func.isRequired,
};

export default Registration;
