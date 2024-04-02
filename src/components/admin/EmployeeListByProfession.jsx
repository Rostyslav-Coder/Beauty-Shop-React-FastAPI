// ============ EMPLOYEE-LIST-BY-PROFESSOIN COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfessionSelect from '../official/ProfessionSelect';


const EmployeeListByProfession = () => {
	const [selectedProfession, setSelectedProfession] = useState('');
	const [employeeList, setEmployeeList] = useState([]);
	const [error, setError] = useState(null);
	const [start, setStart] = useState(0);
	const [count, setCount] = useState(10);

	useEffect(() => {
		setStart(0);
		setCount(10);
	}, [selectedProfession]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		let reques = (
			`?skip=${start}&limit=${count}&profession_id=${selectedProfession}`
		);

		try {
			const response = await axios({
				method: 'get',
				url: `http://127.0.0.1:8000/admin/employee/profession${reques}`,
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			setEmployeeList(response.data.result);
			setError(null);
			setStart(start + 10);
			setCount(count + 10);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setError('There are no more employees');
			} else {
				setError('An error occurred while receiving data');
			}
		}
	};

	return (
		<div>
			<h2>Get Employees By Professin</h2>
			<form onSubmit={handleSubmit}>
				<ProfessionSelect setProfession={setSelectedProfession} />
				<button type='submit'>{start === 0 ? 'Get All Employees' : 'Next'}</button>
			</form>
			{error && <p>{error}</p>}
			{employeeList.length > 0 && (
				<div>
					<h2>Employee with Professon: {employeeList[0].profession.profession}</h2>
					{employeeList.map((employee, index) => {
						return (
							<table key={`table${index}`}>
								<tr key={`firstName${index}`}>
									<th>First Name</th>
									<th>{employee.user.firstName}</th>
								</tr>
								<tr key={`lastName${index}`}>
									<th>Last Name</th>
									<th>{employee.user.lastName}</th>
								</tr>
								<tr key={`email${index}`}>
									<th>Email</th>
									<th>{employee.user.email}</th>
								</tr>
								<tr key={`phoneNumber${index}`}>
									<th>Phone Number</th>
									<th>{employee.user.phoneNumber}</th>
								</tr>
								<tr key={`workingDays${index}`}>
									<th>Working Days</th>
									<th>{employee.workingDays}</th>
								</tr>
								<tr key={`workingSift${index}`}>
									<th>Working Sift</th>
									<th>{employee.workingShift}</th>
								</tr>
								<tr key={`employeeId${index}`}>
									<th>Employee Id</th>
									<th>{employee.id}</th>
								</tr>
								<tr key={`userId${index}`}>
									<th>User Id</th>
									<th>{employee.user.id}</th>
								</tr>
							</table>
						)
					})}
				</div>
			)}
		</div>
	)
};

export default EmployeeListByProfession;
