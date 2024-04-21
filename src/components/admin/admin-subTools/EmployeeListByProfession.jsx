// ============ EMPLOYEE-LIST-BY-PROFESSOIN COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ProfessionSelect from '../../official/ProfessionSelect';
import sendRequest from '../../../request/request';


// ! Validated Component
const EmployeeListByProfession = ({ setEmployeeListProf, setError }) => {
	const [selectedProfession, setSelectedProfession] = useState('');
	const [start, setStart] = useState(0);
	const [count, setCount] = useState(5);

	useEffect(() => {
		setStart(0);
		setCount(5);
	}, [selectedProfession]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/employees/profession';
		const data = { skip: start, limit: count, profession_id: selectedProfession };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
			} else {
				setEmployeeListProf(result.result);
				setError(null);
				setStart(start + 5);
				setCount(count);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<ProfessionSelect setProfession={setSelectedProfession} />
				<button type='submit'>{start === 0 ? 'Get Employees' : 'Next Employees'}</button>
			</form>
		</div>
	);
};

EmployeeListByProfession.propTypes = {
	setEmployeeListProf: PropTypes.func,
	setError: PropTypes.func,
	isOpen: PropTypes.bool.isRequired,
	onOpen: PropTypes.func.isRequired,
};

export default EmployeeListByProfession;
