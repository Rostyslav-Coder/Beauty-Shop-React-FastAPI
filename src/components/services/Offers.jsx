// ============ OFFERS COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import simpleRequest from '../../request/simpleRequest';
import '../../styles/Offers.css';


const Offers = () => {
	const [offers, setOffers] = useState([]);
	const [error, setError] = useState(null);
	const serviseId = useLocation().state.serviceId;

	useEffect(() => {
		const REQUEST_URL = '/offers/all_by_service';
		const data = { service_id: serviseId };

		const fetchData = async () => {
			const result = await simpleRequest(REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
			} else {
				setOffers(result.result);
				setError(null);
			}
		};

		fetchData();
	}, [serviseId]);


	return (
		<div className='offers'>
			<h2>Suggestions from our specialists:</h2>
			{offers && (
				offers.map(offer => (
					<div key={offer.id} className='offers__card'>
						<h3>{offer.service.name}</h3>
						<p>{offer.service.description}</p>
						<p>Service duration: {offer.duration} hours.</p>
						<p>Service price: ${offer.price}</p>
						<p>Specialists: {offer.employee.user.firstName} {offer.employee.user.lastName}</p>
					</div>
				))
			)}
			{!offers && <p className='offers__error'>No offers found</p>}
			{error && <p className='offers__error'>{error}</p>}
		</div>
	)
};

Offers.propTypes = {
	serviceId: PropTypes.number
}

export default Offers;
