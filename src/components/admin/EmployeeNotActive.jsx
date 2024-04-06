// ============ EMPLOYEE-NOT-ACTIVE COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';
import sendRequest from '../../request/request';


const EmployeeNotActive = ({ setFormerEmployee, setError }) => {
	const [employeeId, setEmployeeId] = useState('');

	const handleEmployeeIdChange = (e) => {
		setEmployeeId(e.target.value);
	};

	const handleSUbmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/employees/delete';
		const data = { employee_id: employeeId };

		try {
			const result = await sendRequest('put', REQUEST_URL, data);
			console.log('result.result: ', result.result)
			if (result.error) {
				setError(result.error)
			} else {
				setFormerEmployee(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
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
