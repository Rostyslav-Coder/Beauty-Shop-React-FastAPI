// ============ OFFER-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


// ! Validated Component
const OfferManagerDesktop = ({ newOffer, offers, serviceInfo, error }) => {
	return (
		<>
			{serviceInfo && (
				<div className='employeeData'>
					<h2>Selected Service Info:</h2>
					<table>
						{serviceInfo.name && (
							<tr>
								<th>Service Name:</th>
								<th>{serviceInfo.name}</th>
							</tr>
						)}
						{serviceInfo.minPrice && (
							<tr>
								<th>Service Minimum Price:</th>
								<th>{serviceInfo.minPrice}</th>
							</tr>
						)}
						{serviceInfo.description && (
							<tr>
								<th>Service Description:</th>
								<th>{serviceInfo.description}</th>
							</tr>
						)}
						<tr>
							<th colSpan={2}>The offer price cannot be less than the minimum salon price.</th>
						</tr>
						<tr>
							<th colSpan={2}>
								Specify the duration of the offer, taking into account the time for cleaning the workplace and a short rest.
							</th>
						</tr>
					</table>
				</div>
			)}

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

			{offers.length > 0 && (
				<div className='employeeData'>
					<h2>My Offers:</h2>
					<table>
						{offers.map((offer, index) => (
							<>
								<tr key={`${index}_${offer.id}`}>
									<th colSpan={2} style={{ textAlign: 'center' }}>{offer.service.name}</th>
								</tr>
								<tr key={`${index}_${offer.id}`}>
									<th>Price:</th>
									<th>$ {offer.price}.0</th>
								</tr>
								<tr key={offer.id}>
									<th>Duration:</th>
									<th>{offer.duration} hours</th>
								</tr>
								<tr key={offer.id}>
									<th>Description:</th>
									<th>{offer.service.description}</th>
								</tr>
							</>
						))}
					</table>
				</div>
			)}

			{error && <p>{error}</p>}
		</>
	);
};

OfferManagerDesktop.propTypes = {
	newOffer: PropTypes.object,
	offers: PropTypes.array,
	serviceInfo: PropTypes.object,
	error: PropTypes.string,
};

export default OfferManagerDesktop;
