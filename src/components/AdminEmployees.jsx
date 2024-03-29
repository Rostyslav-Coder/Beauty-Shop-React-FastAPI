// ============ ADMIN-EMPLOYEES COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';


const AdminGetUserEmployee = () => {
	const [userEmail, setUserEmail] = useState('');
	const [userData, setUserData] = useState(null);

	const handleInputChange = (e) => {
		setUserEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');

		try {
			const response = await axios.get(`http://127.0.0.1:8000/admin/employee/user?user_email=${userEmail}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUserData(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
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
			{userData && (
				<div>
					<h2>User Data:</h2>
					{userData.id && <p>User ID: {userData.id}</p>}
					{userData.firstName && <p>User First Name: {userData.firstName}</p>}
					{userData.lastName && <p>User Last Name: {userData.lastName}</p>}
					{userData.email && <p>User Email: {userData.email}</p>}
					{userData.phoneNumber && <p>User Phone Number: {userData.phoneNumber}</p>}
					{userData.role && <p>User Role: {userData.role}</p>}
				</div>
			)}
		</div>
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
