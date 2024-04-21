// ============ EMPLOYEE-LIST-ALL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import sendRequest from '../../../request/request';


// ! Validated Component
const EmployeeListAll = ({ setEmployeeListAll, setError }) => {
	const [start, setStart] = useState(0);
	const [count, setCount] = useState(5);

	const fetchData = async (start, count) => {
		const REQUEST_URL = '/employees/all';
		const data = { skip: start, limit: count, };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
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
		await fetchData(start, count);
		setStart(start + 5);
		setCount(count);
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<button type='submit'>{start < 5 ? 'Get All Employees' : 'Next'}</button>
			</form>
		</div>
	);
};

EmployeeListAll.propTypes = {
	setEmployeeListAll: PropTypes.func,
	setError: PropTypes.func,
};

export default EmployeeListAll;
