// ============ OFFER-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const OfferManagerDesktop = ({ newOffer, error }) => {
	return (
		<>
			{newOffer && (
				<div className='employeeData'>
					<h2>Created Offer Data:</h2>
					<table>
						{newOffer.price && (
							<tr>
								<th>Offer Price:</th>
								<th>{newOffer.price}</th>
							</tr>
						)}
						{newOffer.duration && (
							<tr>
								<th>Offer Duration:</th>
								<th>{newOffer.duration}</th>
							</tr>
						)}
					</table>
				</div>
			)}
			{error && <p>{error}</p>}
		</>
	);
};

OfferManagerDesktop.propTypes = {
	newOffer: PropTypes.object,
	error: PropTypes.string,
};

export default OfferManagerDesktop;
