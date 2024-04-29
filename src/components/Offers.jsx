// ============ OFFERS PAGE COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import simpleRequest from '../request/simpleRequest';
import '../styles/Offers.css';


// ! Validated Component
const Offers = () => {
	const [offers, setOffers] = useState([]);
	const [error, setError] = useState(null);
	const serviseId = useLocation().state.serviceId;
	const navigate = useNavigate();

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
			)
			}
			{offers.length === 0 && (
				<p className='offers__error'>
					Unfortunately there are no offers in this category yet.
				</p>
			)}
			{error && <p className='offers__error'>{error}</p>}
			< button
				className='offers__button'
				onClick={() => navigate(-1)}
			>
				Go back
			</button>
		</div >
	)
};

export default Offers;
