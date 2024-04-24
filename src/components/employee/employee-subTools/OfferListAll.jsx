// ============ OFFER-LIST-ALL COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';

import sendRequest from '../../../request/request';


// ! Validated Component
const OfferListAll = ({ setOffers, myData, setError }) => {

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/offers/all_my';
		const data = { employee_id: myData.id };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
			} else {
				setOffers(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<button type='submit'>Get Offers</button>
			</form>
		</div>
	);
};

OfferListAll.propTypes = {
	setOffers: PropTypes.func,
	myData: PropTypes.object,
	setError: PropTypes.func,
};

export default OfferListAll;
