// ============ OFFER-CREATOR COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import sendRequest from '../../../request/request';
import ServiceSelect from '../../official/ServiceSelect';

const OfferCreator = ({ setNewOffer, setError }) => {
	const [price, setPrice] = useState('');
	const [duration, setDuration] = useState('');
	const [serviceId, setServiceId] = useState('');
	// const [employeeId, setEmployeeId] = useState('');

	const handlerPriceChange = (e) => {
		setPrice(e.target.value);
	};

	const handlerDurationChange = (e) => {
		setDuration(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/offers/create';
		const schema = {
			price: price,
			duration: duration,
			service_id: serviceId,
			// employee_id: employeeId,
		};

		try {
			const result = await sendRequest('post', REQUEST_URL, schema);
			if (result.error) {
				setError(result.error)
			} else {
				setNewOffer(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<ServiceSelect setService={setServiceId} />
				<label htmlFor='price'>
					Enter Price:
					<input
						id='price'
						type='text'
						value={price}
						onChange={handlerPriceChange}
						required
					/>
				</label>
				<label htmlFor='duration'>
					Enter Duration:
					<select id='duration' onChange={handlerDurationChange} required>
						<option value='None' selected>Select One</option>
						<option value='0.5' selected>Half an Hour</option>
						<option value='1' selected>One Hour</option>
						<option value='1.5' selected>An Hour and a Half</option>
						<option value='2' selected>Two Hour</option>
						<option value='2.5' selected>Two and a Half Hours</option>
						<option value='3' selected>Three Hours</option>
					</select>
				</label>
			</form>
		</div>
	);
};

OfferCreator.propTypes = {
	setNewOffer: PropTypes.func,
	setError: PropTypes.func,
};

export default OfferCreator;
