// ============ EMPLOYEE-LIST-ALL COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const EmployeeListAll = ({ setEmployeeListAll, setError }) => {
	const [start, setStart] = useState(0);
	const [count, setCount] = useState(3);
	const [hasNextClicked, setHasNextClicked] = useState(false);

	const fetchData = async (start, count) => {
		const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
		const REQUEST_URL = '/admin/employee/all';
		const token = localStorage.getItem('token');
		const auth = { 'Authorization': `Bearer ${token}`, };

		let request = `?skip=${start}&limit=${count}`;

		try {
			const response = await axios({
				method: 'get',
				url: BASE_URL + REQUEST_URL + request,
				headers: auth,
			});
			setEmployeeListAll(response.data.result);
			setError(null);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setError('Unauthorized request');
			} else if (error.response && error.response.status === 404) {
				setError('There are no more employees');
			} else {
				setError('An error occurred while receiving data');
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newStart = start + 3;
		let newCount = count + 3;
		await fetchData(start, count);
		setStart(newStart);
		setCount(newCount);
		setHasNextClicked(true);
	};

	const handleBackSubmit = async (e) => {
		e.preventDefault();
		if (start < 3) {
			setHasNextClicked(false);
		}
		let newStart = start - 3;
		let newCount = count - 3;
		setStart(newStart);
		setCount(newCount);
		await fetchData(start - 3, count - 3);
	};

	return (
		<div>
			<h2>All Employees</h2>
			<form onSubmit={handleSubmit}>
				<button type='submit'>{start < 3 ? 'Get All Employees' : 'Next'}</button>
				<button type='submit' onClick={handleBackSubmit} disabled={!hasNextClicked}>Back</button>
			</form>
		</div>
	);
};

EmployeeListAll.propTypes = {
	setEmployeeListAll: PropTypes.func,
	setError: PropTypes.func,
};

export default EmployeeListAll;
