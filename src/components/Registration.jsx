// ============ REGISTRATION PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUserContext } from './hooks/useUserContext';
import axios from 'axios';
import '../styles/Auth-Registr.css';


const Registration = () => {
	const { setUserEmail, setUserRole } = useUserContext();

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
			const response = (
				await axios.post('http://127.0.0.1:8000/users/create', dataToSend)
			)
			localStorage.setItem('token', JSON.stringify(response.data.access_token));
			const decodedToken = jwtDecode(localStorage.getItem('token'));
			localStorage.setItem('userRole', decodedToken.role);
			setUserRole(localStorage.getItem('userRole'));
			localStorage.setItem('userEmail', decodedToken.email);
			setUserEmail(localStorage.getItem('userEmail'));
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
			confirmPassword: '',
		});
	};

	return (
		<div className="registration">
			<div className="registration__wrapper">
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
					<input
						className='registration__button'
						id='submit'
						type='submit'
						name='submit'
					/>
					<input
						className='registration__button'
						id='reset'
						type='reset'
						name='reset'
						onClick={handleReset}
					/>
					<label className='registration__label' htmlFor='login'>
						Already registered? Click here to login.
						<div className='registration__button'>
							<Link
								className='registration__link'
								to={'/Authentication'}
								id='login'
							>
								Login
							</Link>
						</div>
					</label>
				</form>
				<p className='registration__text'>Fields marked with <span>*</span> are required.</p>
			</div>
		</div>
	);
};

export default Registration;
