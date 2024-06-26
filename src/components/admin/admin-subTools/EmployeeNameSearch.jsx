// ============ EMPLOYEE-BY-NAME COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import sendRequest from '../../../request/request';


// ! Validated Component
const EmployeeNameSearch = ({ setSearchedEmployeeData, setError, }) => {
	const [searchedEmployeeName, setSearchedEmployeeName] = useState('');

	const handleEmployeeNameChange = (e) => {
		setSearchedEmployeeName(e.target.value);
	};

	const resetData = () => {
		setSearchedEmployeeName('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/employees/info';
		const data = { employee_name: searchedEmployeeName };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
			} else {
				setSearchedEmployeeData(result.result);
				resetData();
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>
					Enter Employee Name:
					<input
						id='name'
						type='text'
						value={searchedEmployeeName}
						onChange={handleEmployeeNameChange}
						required
					/>
				</label>
				<button type='submit'>Get Employee Data</button>
			</form>
		</div>
	);
};

EmployeeNameSearch.propTypes = {
	setSearchedEmployeeData: PropTypes.func,
	setError: PropTypes.func,
	isOpen: PropTypes.bool.isRequired,
	onOpen: PropTypes.func.isRequired,
};

export default EmployeeNameSearch;
