// ============ BOOKING-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';

const BookingManagerDesktop = ({ bookings, error }) => {
	return (
		<div>
			<h3>Bookings:</h3>
			<p>{bookings}</p>
			{error && <p>{error}</p>}
		</div>
	);
};

BookingManagerDesktop.propTypes = {
	bookings: PropTypes.array,
	error: PropTypes.string,
};

export default BookingManagerDesktop;
