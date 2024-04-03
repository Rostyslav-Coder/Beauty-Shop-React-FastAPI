// ============ EMPLOYEE-LIST-BY-PROFESSOIN COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProfessionSelect from '../official/ProfessionSelect';


const EmployeeListByProfession = ({ setEmployeeList, setError }) => {
	const [selectedProfession, setSelectedProfession] = useState('');
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
			<h2>Get Employees Info</h2>
			<form onSubmit={handleSubmit}>
				<ProfessionSelect setProfession={setSelectedProfession} />
				<button type='submit'>{start === 0 ? 'Get All Employees' : 'Next'}</button>
			</form>
		</div>
	);
};

EmployeeListByProfession.propTypes = {
	setEmployeeList: PropTypes.func,
	setError: PropTypes.func,
};

export default EmployeeListByProfession;
