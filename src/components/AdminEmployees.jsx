// ============ ADMIN-EMPLOYEES COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';


const AdminGetUserEmployee = () => {
	const [userEmail, setUserEmail] = useState('');

	const handleInputChange = (e) => {
		setUserEmail(e.target.valut);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');

		try {
			const response = await axios.get('http://127.0.0.1:8000/admin/employee/user', {
				headers: { Authorization: `Bearer ${token}` },
				params: { user_email: userEmail },
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor=''>
				Add User Email:
				<input
					type='email'
					value={userEmail}
					onChange={handleInputChange}
					required
				/>
			</label>
			<button type='submit'>Get Users Data</button>
		</form>
	);
};

const AdminEmployees = () => {
	return (
		<section className='adminEmployees'>
			<h2 className="adminEmployees__title">Employees</h2>
			<AdminGetUserEmployee />
		</section>
	);
};

export default AdminEmployees;
