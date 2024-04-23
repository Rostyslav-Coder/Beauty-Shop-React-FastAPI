// ============ SERVICE-SELECT COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import simpleRequest from '../../request/simpleRequest';


// ! Validated Component
const ServiceSelect = ({ setService }) => {
	const [serviceOption, setServiceOption] = useState([]);

	useEffect(() => {
		const REQUEST_URL = '/services/all';

		const fetchData = async () => {
			const result = await simpleRequest(REQUEST_URL);
			if (result.error) {
				setServiceOption([]);
			} else {
				setServiceOption(result.result);
			}
		}

		fetchData();
	}, []);

	const handleServiceChange = (e) => {
		setService(e.target.value);
	};

	return (
		<label htmlFor='service'>
			Select Service:
			<select id='service' onChange={handleServiceChange} required>
				<option key={'default'} value={''} selected>Select One</option>
				{serviceOption && serviceOption.map((service, index) => (
					<option key={index} value={service.id}>
						{service.name}
					</option>
				))}

			</select>
		</label>
	);
};

ServiceSelect.propTypes = {
	setService: PropTypes.func,
};

export default ServiceSelect;
