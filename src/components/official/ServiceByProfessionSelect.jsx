// ============ SERVICE-BY-PROFESSION-SELECT COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import simpleRequest from '../../request/simpleRequest';


// ! Validated Component
const ServiceByProfessionSelect = ({ setServiceId, setServiceInfo, myData }) => {
	const [serviceOption, setServiceOption] = useState([]);

	useEffect(() => {
		if (myData) {
			const REQUEST_URL = '/services/all_by_profesion';
			const data = { profession_id: myData.professionId };

			const fetchData = async () => {
				const result = await simpleRequest(REQUEST_URL, data);
				if (result.error) {
					setServiceOption([]);
				} else {
					setServiceOption(result.result);
				}
			}

			fetchData();
		}
	}, [myData]);

	const handleServiceChange = (e) => {
		const selectedServiceId = e.target.value;
		setServiceId(selectedServiceId);

		const selectedService = serviceOption.find(service => service.id == selectedServiceId);
		setServiceInfo(selectedService);
	};

	return (
		<label htmlFor='service'>
			Select Service:
			<select id='service' onChange={handleServiceChange} required>
				<option key='default' value={''} selected>
					Select One
				</option>
				{serviceOption && serviceOption.map((service, index) => (
					<option key={index} value={service.id}>
						{service.name}
					</option>
				))}
			</select>
		</label>
	);
};

ServiceByProfessionSelect.propTypes = {
	setServiceId: PropTypes.func,
	setServiceInfo: PropTypes.func,
	myData: PropTypes.object,
};

export default ServiceByProfessionSelect;
