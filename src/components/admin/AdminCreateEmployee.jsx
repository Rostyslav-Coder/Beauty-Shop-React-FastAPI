// ============ ADMIN-CREATE-EMPLOYEE COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import ProfessionSelect from '../official/ProfessionSelect';


const AdminCreateEmployee = () => {
	const [userId, setUserId] = useState('');
	const [profession, setProfession] = useState('');
	const [workingDays, setWorkingDays] = useState('');
	const [workingShift, setWorkingShift] = useState('');
	const [employeeData, setEmployeeData] = useState(null);

	const handleInputIdChange = (e) => {
		setUserId(e.target.value);
	};

	const handleInputWorkingDaysChange = (e) => {
		setWorkingDays(e.target.value);
	};

	const handleInputWorkingShiftChange = (e) => {
		setWorkingShift(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const schema = {
			user_id: userId,
			profession: profession,
			working_days: workingDays,
			working_shift: workingShift,
		}

		try {
			const response = await axios({
				method: 'post',
				url: 'http://127.0.0.1:8000/admin/employee/create/',
				data: schema,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			})
			setEmployeeData(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='userId'>
					Add User ID:
					<input
						id='userId'
						type='text'
						value={userId}
						onChange={handleInputIdChange}
						required
					/>
				</label>
				<ProfessionSelect setProfession={setProfession} />
				<label htmlFor='workingDays'>
					Select Employee Working Days:
					<select
						id='workingDays'
						onChange={handleInputWorkingDaysChange}
						required
					>
						<option value={null}>Select One:</option>
						<option value='EVEN DAYS'>EVEN DAYS</option>
						<option value='ODD DAYS'>ODD DAYS</option>
						<option value='WEEK DAYS'>WEEK DAYS</option>
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
						<option value='MORNING SHIFT'>MORNING SHIFT</option>
						<option value='AFTERNOON SHIFT'>AFTERNOON SHIFT</option>
					</select>
				</label>
				<button type='submit'>Create Employee</button>
			</form>
			{employeeData && (
				<div>
					<h2>Created Employee Data:</h2>
					{employeeData.id && <p>Employee ID: {employeeData.id}</p>}
					{employeeData.profession && <p>Employee Profession: {employeeData.profession}</p>}
					{employeeData.workingDays && <p>Employee Working Days: {employeeData.workingDays}</p>}
					{employeeData.workingShift && <p>Employee Working Shift: {employeeData.workingShift}</p>}
				</div>
			)}
		</div>
	)
};

export default AdminCreateEmployee;
