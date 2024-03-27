// ============ AUTHENTICATION PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import '../styles/Auth-Registr.css';
import axios from 'axios';


const Authentication = () => {
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
		const dataToSend = new URLSearchParams();
		dataToSend.append('username', formData.email);
		dataToSend.append('password', formData.password);
		console.log('auth dataToSend:', dataToSend)

		try {
			const response = (
				await axios.post('http://127.0.0.1:8000/auth/login', dataToSend)
			);
			if (response.data) {
				localStorage.setItem('token', response.data.access_token);
				localStorage.setItem('user', response.data.user);
				localStorage.setItem('userRole', response.data.user.role);
				handleReset();
			}
		} catch (error) {
			console.log('Error when submitting form:', error);
		}
	};

	return (
		<div className='authentication'>
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
	);
};

export default Authentication;
