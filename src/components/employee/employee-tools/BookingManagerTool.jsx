// ============ BOOKING-MANAGER-TOOL COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';

import BookingToday from '../employee-subTools/BookingToday';
import BookingTomorrow from '../employee-subTools/BookingTomorrow';
import BookingNextWeek from '../employee-subTools/BookingNextWeek';


const BookingManagerTool = ({ setBookings, myData, setError, isOpen, onOpen }) => {

	return (
		<div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
			<h2>Booking Manager</h2>
			{isOpen && (
				<>
					<BookingToday setBookings={setBookings} myData={myData} setError={setError} />
					<BookingTomorrow setBookings={setBookings} myData={myData} setError={setError} />
					<BookingNextWeek setBookings={setBookings} myData={myData} />
				</>
			)}
		</div>
	);
};

BookingManagerTool.propTypes = {
	setBookings: PropTypes.func,
	myData: PropTypes.object,
	setError: PropTypes.func,
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
}

export default BookingManagerTool;
