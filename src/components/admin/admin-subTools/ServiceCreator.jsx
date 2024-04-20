// ============ SERVICE-CREATOR COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ProfessionSelect from '../../official/ProfessionSelect';
import sendRequest from '../../../request/request';


// ! Validated Component
const ServiceCreator = ({ setNewServiceData, setError }) => {
	const [serviceName, setServiceName] = useState('');
	const [serviceDescription, setServiceDescription] = useState('');
	const [minServicePrice, setMinServicePrice] = useState('');
	const [associatedProfession, setAssociatedProfession] = useState('');

	const handleServiceNameChange = (e) => {
		setServiceName(e.target.value);
	};

	const handleServiceDescriptionChange = (e) => {
		setServiceDescription(e.target.value);
	};

	const handleMinServicePriceChange = (e) => {
		setMinServicePrice(e.target.value);
	};

	const resetData = () => {
		setServiceName('');
		setServiceDescription('');
		setMinServicePrice('');
		setAssociatedProfession('');
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/services/create';
		const schema = {
			name: serviceName.toUpperCase(),
			description: serviceDescription,
			min_price: minServicePrice,
			profession_id: associatedProfession,
		};

		try {
			const result = await sendRequest('post', REQUEST_URL, schema);
			if (result.error) {
				setError(result.error);
			} else {
				setNewServiceData(result.result);
				resetData();
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<ProfessionSelect setProfession={setAssociatedProfession} />
				<label htmlFor='serviceName'>
					Add Service Name:
					<input
						id='serviceName'
						type='text'
						value={serviceName}
						onChange={handleServiceNameChange}
						required
					/>
				</label>
				<label htmlFor='serviceDescription'>
					Add Service Description:
					<input
						id='serviceDescription'
						type='text'
						value={serviceDescription}
						onChange={handleServiceDescriptionChange}
						required
					/>
				</label>
				<label htmlFor='minServicePrice'>
					Add Minimal Service Price:
					<input
						id='minServicePrice'
						type='text'
						value={minServicePrice}
						onChange={handleMinServicePriceChange}
						required
					/>
				</label>
				<button type='submit'>Create Service</button>
			</form>
		</div>
	);
};

ServiceCreator.propTypes = {
	setNewServiceData: PropTypes.func,
	setError: PropTypes.func,
};

export default ServiceCreator;
