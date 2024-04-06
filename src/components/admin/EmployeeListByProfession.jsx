// ============ EMPLOYEE-LIST-BY-PROFESSOIN COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import sendRequest from '../../request/request';
import ProfessionSelect from '../official/ProfessionSelect';


const EmployeeListByProfession = ({ setEmployeeListProf, setError }) => {
	const [selectedProfession, setSelectedProfession] = useState('');
	const [start, setStart] = useState(0);
	const [count, setCount] = useState(3);

	useEffect(() => {
		setStart(0);
		setCount(3);
	}, [selectedProfession]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/employees/profession';
		const data = { skip: start, limit: count, profession_id: selectedProfession };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error)
			} else {
				setEmployeeListProf(result.result);
				setError(null);
				setStart(start + 3);
				setCount(count + 3);
			}
		} catch (error) {
			setError(error);
		}
		//  ==================================================================
		// const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
		// const REQUEST_URL = '/admin/employee/profession';
		// const token = localStorage.getItem('token');
		// const auth = { 'Authorization': `Bearer ${token}`, };

		// let request = (
		// `?skip=${start}&limit=${count}&profession_id=${selectedProfession}`
		// );

		// try {
		// const response = await axios({
		// method: 'get',
		// url: BASE_URL + REQUEST_URL + request,
		// headers: auth,
		// });
		// setEmployeeListProf(response.data.result);
		// setError(null);
		// setStart(start + 3);
		// setCount(count + 3);
		// } catch (error) {
		// if (error.response && error.response.status === 401) {
		// setError('Unauthorized request');
		// } else if (error.response && error.response.status === 404) {
		// setError('There are no more employees');
		// } else {
		// setError('An error occurred while receiving data');
		// }
		// }
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
	setEmployeeListProf: PropTypes.func,
	setError: PropTypes.func,
};

export default EmployeeListByProfession;
