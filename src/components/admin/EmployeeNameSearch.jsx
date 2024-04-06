// ============ EMPLOYEE-BY-NAME COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';
import sendRequest from '../../request/request';


const EmployeeNameSearch = (
	{
		searchedEmployeeName,
		setSearchedEmployeeName,
		setSearchedEmployeeData,
		setError
	}
) => {
	const handleEmployeeNameChange = (e) => {
		setSearchedEmployeeName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/employees/get';
		const data = { employee_name: searchedEmployeeName };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error)
			} else {
				setSearchedEmployeeData(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='employeeNameSearch'>
			<h2>Get Employee Info</h2>
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
	searchedEmployeeName: PropTypes.string,
	setSearchedEmployeeName: PropTypes.func,
	setSearchedEmployeeData: PropTypes.func,
	setError: PropTypes.func,
};

export default EmployeeNameSearch;
