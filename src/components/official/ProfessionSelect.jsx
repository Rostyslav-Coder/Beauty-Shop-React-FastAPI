// ============ PROFESSION-SELECT COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const ProfessionSelect = ({ setProfession }) => {
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem('token');

			try {
				const response = await axios({
					method: 'get',
					url: 'http://127.0.0.1:8000/profession/all',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					}
				})
				setOptions(response.data.result)
				console.log('response.data.result:', response.data.result)
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleProfessionChange = (e) => {
		setProfession(e.target.value);
	};

	console.log(options)

	return (
		<label htmlFor='profession'>
			Select Employee Profession:
			<select
				id='profession'
				onChange={handleProfessionChange}
				required
			>
				<option key='empty' value={null} selected>
					Select One:
				</option>
				{options && options.map((option, index) => (
					<option key={index} value={option.id}>
						{option.profession}
					</option>
				))}
			</select>
		</label>
	)
};

ProfessionSelect.propTypes = {
	setProfession: PropTypes.func,
};

export default ProfessionSelect;
