// ============ EMPLOYEE-NOT-ACTIVE COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const EmployeeNotActive = ({ setFormerEmployee, setError }) => {
	const [employeeId, setEmployeeId] = useState('');

	const handleEmployeeIdChange = (e) => {
		setEmployeeId(e.target.value);
	};

	const handleSUbmit = async (e) => {
		e.preventDefault();

		const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
		const REQUEST_URL = '/admin/employee/delete';
		const token = localStorage.getItem('token');
		const auth = {
			'Authorization': `Bearer ${token}`,
			// 'Content-Type': 'application/json',
		}
		const request = `?employee_id=${employeeId}`;

		try {
			const response = await axios({
				method: 'put',
				url: BASE_URL + REQUEST_URL + request,
				headers: auth,
				// data: request,
			});
			console.log('response.data.result: ', response.data.result)
			setFormerEmployee(response.data.result);
			setError(null);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setError('Unauthorized request')
			} else if (error.response && error.response.status === 404) {
				setError(`There are no employees with ID ${employeeId}`);
			} else {
				setError('An error occurred while receiving data');
			}
		}
	};

	return (
		<div>
			<h2>Deactivate Employee</h2>
			<form onSubmit={handleSUbmit}>
				<label htmlFor='id'>
					Enter Employee ID:
					<input
						id='id'
						type='text'
						value={employeeId}
						onChange={handleEmployeeIdChange}
						required
					/>
				</label>
				<button type='submit'>Deactivate</button>
			</form>
		</div>
	);
};

EmployeeNotActive.propTypes = {
	formerEmployee: PropTypes.object,
	setFormerEmployee: PropTypes.func,
	setError: PropTypes.func,
};

export default EmployeeNotActive;
