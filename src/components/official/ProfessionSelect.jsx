// ============ PROFESSION-SELECT COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


// ! Validated Component
const ProfessionSelect = ({ setProfession }) => {
	const [professionOptions, setProfessionOptions] = useState([]);

	useEffect(() => {
		const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: BASE_URL + '/professions/all',
				})
				setProfessionOptions(response.data.result)
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleProfessionChange = (e) => {
		setProfession(e.target.value);
	};

	return (
		<label htmlFor='profession'>
			Select Profession:
			<select id='profession' onChange={handleProfessionChange} required>
				<option key='default' value={''} selected>
					Select One:
				</option>
				{professionOptions && professionOptions.map((profession, index) => (
					<option key={index} value={profession.id}>
						{profession.name}
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
