// ============ PROFESSION-SERVICE-SELECT COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import sendSimpleRequest from '../../request/simpleRequest';

const ProfessionServiceSelect = ({ setProfession, setService }) => {
	const [professionList, setProfessionList] = useState([]);
	const [serviceList, setServiceList] = useState([]);
	const [selectedProfession, setSelectedProfession] = useState('');

	useEffect(() => {
		const URL = '/professions/all';
		const result = sendSimpleRequest(URL)

		if (result.error) {
			console.log(result.error);
		} else {
			setProfessionList(result.result);
		}
	}, []);

	useEffect(() => {
		if (!selectedProfession) {
			setServiceList([]);
			return;
		}

		const URL = '/services/by_profession';
		const data = { profession_id: selectedProfession };
		const result = sendSimpleRequest(URL, data)

		if (result.error) {
			console.log(result.error);
		} else {
			setServiceList(result.result);
		}
	}, [selectedProfession]);

	const handleProfessionChange = (e) => {
		setProfession(e.target.value);
		setSelectedProfession(e.target.value);
	};

	const handleServiceChange = (e) => {
		setService(e.target.value);
	};

	return (
		<>
			<label htmlFor='profession'>
				Select Profession:
				<select
					id='profession'
					onChange={handleProfessionChange}
					required
				>
					<option key='default' value={''} selected>
						Select One:
					</option>
					{professionList && professionList.map((profession, index) => (
						<option key={index} value={profession.id}>
							{profession.name}
						</option>
					))}
				</select>
			</label>
			<label htmlFor='service'>
				Select Service:
				<select id='service' onChange={handleServiceChange} required disabled={!selectedProfession}>
					<option key={'default'} value={''} selected>Select One</option>
					{serviceList && serviceList.map((service, index) => (
						<option key={index} value={service.id}>
							{service.name}
						</option>
					))}
				</select>
			</label>
		</>
	);
};

ProfessionServiceSelect.propTypes = {
	setProfession: PropTypes.func,
	setService: PropTypes.func,
};

export default ProfessionServiceSelect;
