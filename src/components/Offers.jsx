// ============ OFFERS COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import simpleRequest from '../request/simpleRequest';
import '../styles/Offers.css';


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
			<h2 className='offers__title'>Suggestions from our specialists:</h2>
			{offers.length > 0 && (
				offers.map(offer => (
					<div key={offer.id} className='offers__card'>
						<h3>{offer.service.name}</h3>
						<p>{offer.service.description}</p>
						<p>Service duration: {offer.duration} hours.</p>
						<p>Service price: ${offer.price}</p>
						<p>Specialists: {offer.employee.user.firstName} {offer.employee.user.lastName}</p>
						<Link
							className='offers__button'
							to={'/booking'}
							state={{ offerId: offer.id }}
						>
							Book now
						</Link>
					</div>
				))
			)}
			{!offers && <p className='offers__error'>No offers found</p>}
			{error && <p className='offers__error'>{error}</p>}
		</div>
	)
};

export default Offers;
