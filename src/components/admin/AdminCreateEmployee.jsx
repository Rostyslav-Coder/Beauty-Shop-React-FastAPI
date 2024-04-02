// ============ ADMIN-CREATE-EMPLOYEE COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProfessionSelect from '../official/ProfessionSelect';


const AdminCreateEmployee = ({ setCreatedEmployeeData }) => {
	const [createUserById, setCreateUserById] = useState('');
	const [createUserProfession, setCreateUserProfession] = useState('');
	const [createUserWorkingDays, setCreateUserWorkingDays] = useState('');
	const [createUserWorkingShift, setCreateUserWorkingShift] = useState('');

	const handleInputIdChange = (e) => {
		setCreateUserById(e.target.value);
	};

	const handleInputWorkingDaysChange = (e) => {
		setCreateUserWorkingDays(e.target.value);
	};

	const handleInputWorkingShiftChange = (e) => {
		setCreateUserWorkingShift(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const schema = {
			user_id: createUserById,
			profession_id: createUserProfession,
			working_days: createUserWorkingDays,
			working_shift: createUserWorkingShift,
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
			setCreatedEmployeeData(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Create New Employee</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='userId'>
					Add User ID:
					<input
						id='userId'
						type='text'
						value={createUserById}
						onChange={handleInputIdChange}
						required
					/>
				</label>
				<ProfessionSelect setProfession={setCreateUserProfession} />
				<label htmlFor='workingDays'>
					Select Employee Working Days:
					<select
						id='workingDays'
						onChange={handleInputWorkingDaysChange}
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
						onChange={handleInputWorkingShiftChange}
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

AdminCreateEmployee.propTypes = {
	createdEmployeeData: PropTypes.object,
	setCreatedEmployeeData: PropTypes.func,
};

export default AdminCreateEmployee;
