// ============ PROFESSION-SELECT COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import simpleRequest from '../../request/simpleRequest';


// ! Validated Component
const ProfessionSelect = ({ setProfession }) => {
	const [professionOptions, setProfessionOptions] = useState([]);

	useEffect(() => {
		const REQUEST_URL = '/professions/all';

		const fetchData = async () => {
			const result = await simpleRequest(REQUEST_URL);
			if (result.error) {
				setProfessionOptions([]);
			} else {
				setProfessionOptions(result.result);
			}
		}

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
