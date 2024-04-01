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
			profession_id: profession,
			working_days: workingDays,
			working_shift: workingShift,
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
			setEmployeeData(response.data.result);
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
			{employeeData && (
				<div>
					<h2>Created Employee Data:</h2>
					<table>
						<caption>Created Employee Data:</caption>
						{employeeData.id && (
							<tr>
								<th>Employee ID:</th>
								<th>{employeeData.id}</th>
							</tr>
						)}
						{employeeData.user.id && (
							<tr>
								<th>Employee User ID:</th>
								<th>{employeeData.user.id}</th>
							</tr>
						)}
						{employeeData.user.firstName && (
							<tr>
								<th>Employee First Name:</th>
								<th>{employeeData.user.firstName}</th>
							</tr>
						)}
						{employeeData.user.lastName && (
							<tr>
								<th>Employee Last Name:</th>
								<th>{employeeData.user.lastName}</th>
							</tr>
						)}
						{employeeData.user.email && (
							<tr>
								<th>Employee Email:</th>
								<th>{employeeData.user.email}</th>
							</tr>
						)}
						{employeeData.user.phoneNumber && (
							<tr>
								<th>Employee Phone Number:</th>
								<th>{employeeData.user.phoneNumber}</th>
							</tr>
						)}
						{employeeData.user.role && (
							<tr>
								<th>Employee Role</th>
								<th>{employeeData.user.role}</th>
							</tr>
						)}
						{employeeData.profession.profession && (
							<tr>
								<th>Employee Profession:</th>
								<th>{employeeData.profession.profession}</th>
							</tr>
						)}
						{employeeData.profession.description && (
							<tr>
								<th>Employee Profession Description:</th>
								<th>{employeeData.profession.description}</th>
							</tr>
						)}
						{employeeData.professionId && (
							<tr>
								<th>Employee Professio ID:</th>
								<th>{employeeData.professionId}</th>
							</tr>
						)}
						{employeeData.workingDays && (
							<tr>
								<th>Employee Working Days:</th>
								<th>{employeeData.workingDays}</th>
							</tr>
						)}
						{employeeData.workingShift && (
							<tr>
								<th>Employee Working Shift:</th>
								<th>{employeeData.workingShift}</th>
							</tr>
						)}
						{employeeData.isActive && (
							<tr>
								<th>Employee Is Active:</th>
								<th>{employeeData.isActive ? 'TRUE' : 'FALSE'}</th>
							</tr>
						)}
					</table>
				</div>
			)}
		</div>
	)
};

export default AdminCreateEmployee;
