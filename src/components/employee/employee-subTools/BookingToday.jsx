// ============ BOOKING-TODAY COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';

import sendRequest from '../../../request/request';


const BookingToday = ({ setBookings, myData, setError }) => {

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/bookings/to_given_day';
		const dayTime = new Date();
		const data = {
			employee_id: myData.id,
			date: dayTime.toISOString(),
		};

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
			} else {
				setBookings(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<button type='submit'>Today</button>
		</form>
	);
};

BookingToday.propTypes = {
	setBookings: PropTypes.func,
	myData: PropTypes.object,
	setError: PropTypes.func,
}

export default BookingToday;
