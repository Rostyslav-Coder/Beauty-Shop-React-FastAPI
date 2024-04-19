// ============ AUTHENTICATION PAGE COMPONENT MODULE  ============ //

import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useUserContext } from './hooks/useUserContext';

import '../styles/Auth-Registr.css';
import axios from 'axios';


// ! Validated Component
const Authentication = () => {
	const { setUserEmail, setUserRole } = useUserContext();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleReset = () => {
		setFormData({
			email: '',
			password: '',
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form_data = new URLSearchParams();
		form_data.append('username', formData.email);
		form_data.append('password', formData.password);

		try {
			const response = (
				await axios.post('http://127.0.0.1:8000/auth/token', form_data)
			);
			if (response.data) {
				localStorage.setItem('token', response.data.access_token);
				const decodedToken = jwtDecode(localStorage.getItem('token'));
				localStorage.setItem('userRole', decodedToken.role);
				setUserRole(localStorage.getItem('userRole'));
				localStorage.setItem('userEmail', decodedToken.email);
				setUserEmail(localStorage.getItem('userEmail'));
			}
			handleReset();
		} catch (error) {
			console.log('Error when submitting form:', error);
		}
	};

	return (
		<div className='authentication'>
			<div className='authentication__wrapper'>
				<h1 className='authentication__title'>Welcome back.</h1>
				<form className='authentication__form' onSubmit={handleSubmit}>
					<label htmlFor='email' className='authentication__label'>
						Email:
						<input
							className='authentication__input'
							id='email'
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</label>
					<label htmlFor='password' className='authentication__label'>
						Password:
						<input
							className='authentication__input'
							id='password'
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</label>
					<input
						className='authentication__button'
						id='submit'
						type='submit'
						name='submit'
					/>
					<input
						className='authentication__button'
						id='reset'
						type='reset'
						name='reset'
						onClick={handleReset}
					/>
				</form>
			</div>
		</div>
	);
};

export default Authentication;
