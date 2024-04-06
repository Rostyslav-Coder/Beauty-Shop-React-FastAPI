// ============ EMPLOYEE-LIST-ALL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';
import sendRequest from '../../request/request';


const EmployeeListAll = ({ setEmployeeListAll, setError }) => {
	const [start, setStart] = useState(0);
	const [count, setCount] = useState(3);
	const [hasNextClicked, setHasNextClicked] = useState(false);

	const fetchData = async (start, count) => {
		const REQUEST_URL = '/employees/all';
		const data = { skip: start, limit: count, };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error)
			} else {
				setEmployeeListAll(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
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
