// ============ OFFER-CREATOR COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ServiceByProfessionSelect from '../../official/ServiceByProfessionSelect';
import sendRequest from '../../../request/request';


// ! Validated Component
const OfferCreator = ({ setNewOffer, setServiceInfo, myData, setError }) => {
	const [price, setPrice] = useState('');
	const [duration, setDuration] = useState('');
	const [serviceId, setServiceId] = useState('');

	const handlerPriceChange = (e) => {
		setPrice(e.target.value);
	};

	const handlerDurationChange = (e) => {
		setDuration(e.target.value);
	};

	const handleReset = () => {
		setPrice('');
		setDuration('');
	}
	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/offers/create';
		const schema = {
			price: price,
			duration: duration,
			service_id: serviceId,
			employee_id: myData.id,
		};

		try {
			const result = await sendRequest('post', REQUEST_URL, schema);
			if (result.error) {
				setError(result.error);
			} else {
				setNewOffer(result.result);
				handleReset();
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<ServiceByProfessionSelect
					setServiceId={setServiceId}
					setServiceInfo={setServiceInfo}
					myData={myData}
				/>
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
						<option value={null} selected>Select One</option>
						<option value={0.5}>Half an Hour</option>
						<option value={1}>One Hour</option>
						<option value={1.5}>An Hour and a Half</option>
						<option value={2}>Two Hour</option>
						<option value={2.5}>Two and a Half Hours</option>
						<option value={3}>Three Hours</option>
					</select>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

OfferCreator.propTypes = {
	setNewOffer: PropTypes.func,
	setServiceInfo: PropTypes.func,
	myData: PropTypes.object,
	setError: PropTypes.func,
};

export default OfferCreator;
