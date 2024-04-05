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
		// const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
		// const REQUEST_URL = '/admin/employee/get';
		// const token = localStorage.getItem('token');
		// const auth = { 'Authorization': `Bearer ${token}`, };

		// let request = `?employee_name=${searchedEmployeeName}`;

		// try {
		// 	const response = await axios({
		// 		method: 'get',
		// 		url: BASE_URL + REQUEST_URL + request,
		// 		headers: auth,
		// 	});
		// 	setSearchedEmployeeData(response.data.result);
		// 	setError(null);
		// } catch (error) {
		// 	if (error.response && error.response.status === 401) {
		// 		setError('Unauthorized request')
		// 	} else if (error.response && error.response.status === 404) {
		// 		setError(`There are no employees with name ${searchedEmployeeName}`);
		// 	} else {
		// 		setError('An error occurred while receiving data');
		// 	}
		// }
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
