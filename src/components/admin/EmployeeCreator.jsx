// ============ EMPLOYEE-CREATOR COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProfessionSelect from '../official/ProfessionSelect';


const EmployeeCreator = ({ setNewEmployeeData }) => {
	const [newEmployeeId, setNewEmployeeId] = useState('');
	const [newEmployeeProfession, setNewEmployeeProfession] = useState('');
	const [newEmployeeWorkingDays, setNewEmployeeWorkingDays] = useState('');
	const [newEmployeeWorkingShift, setNewEmployeeWorkingShift] = useState('');

	const handleEmployeeIdChange = (e) => {
		setNewEmployeeId(e.target.value);
	};

	const handleWorkingDaysChange = (e) => {
		setNewEmployeeWorkingDays(e.target.value);
	};

	const handleWorkingShiftChange = (e) => {
		setNewEmployeeWorkingShift(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const schema = {
			user_id: newEmployeeId,
			profession_id: newEmployeeProfession,
			working_days: newEmployeeWorkingDays,
			working_shift: newEmployeeWorkingShift,
		}

		try {
			const response = await axios({
				method: 'post',
				url: 'http://127.0.0.1:8000/admin/employee/create',
				data: schema,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			})
			setNewEmployeeData(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Add New Employee</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='userId'>
					Add User ID:
					<input
						id='userId'
						type='text'
						value={newEmployeeId}
						onChange={handleEmployeeIdChange}
						required
					/>
				</label>
				<ProfessionSelect setProfession={setNewEmployeeProfession} />
				<label htmlFor='workingDays'>
					Select Employee Working Days:
					<select
						id='workingDays'
						onChange={handleWorkingDaysChange}
						required
					>
						<option value={null}>Select One:</option>
						<option value='EVEN_DAYS'>EVEN DAYS</option>
						<option value='ODD_DAYS'>ODD DAYS</option>
						<option value='WEEK_DAYS'>WEEK DAYS</option>
					</select>
				</label>
				<label htmlFor='workingShift'>
					Select Employee Working Shift:
					<select
						id='workingShift'
						onChange={handleWorkingShiftChange}
						required
					>
						<option value={null}>Select One:</option>
						<option value='MORNING_SHIFT'>MORNING SHIFT</option>
						<option value='AFTERNOON_SHIFT'>AFTERNOON SHIFT</option>
					</select>
				</label>
				<button type='submit'>Create Employee</button>
			</form>
		</div>
	)
};

EmployeeCreator.propTypes = {
	setNewEmployeeData: PropTypes.func,
};

export default EmployeeCreator;
