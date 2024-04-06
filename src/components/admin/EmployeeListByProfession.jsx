// ============ EMPLOYEE-LIST-BY-PROFESSOIN COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import sendRequest from '../../request/request';
import ProfessionSelect from '../official/ProfessionSelect';


const EmployeeListByProfession = ({ setEmployeeListProf, setError, isOpen, onOpen }) => {
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
	};

	return (
		<div className={`employeeListByProfession component comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
			<h2>Employees By Prof</h2>
			{isOpen && (
				<form onSubmit={handleSubmit}>
					<ProfessionSelect setProfession={setSelectedProfession} />
					<button type='submit'>{start === 0 ? 'Get All Employees' : 'Next'}</button>
				</form>
			)}
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
