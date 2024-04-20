// ============ SERVICE-SELECT COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


// ! Validated Component
const ServiceSelect = ({ setService }) => {
	const [serviceOption, setServiceOption] = useState([]);

	useEffect(() => {
		const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: BASE_URL + '/services/all'
				})
				setServiceOption(response.data.result)
			} catch (error) {
				console.log(error)
			}
		};

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
