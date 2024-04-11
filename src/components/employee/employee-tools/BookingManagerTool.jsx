// ============ BOOKING-MANAGER-TOOL COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const BookingManagerTool = ({ isOpen, onOpen }) => {
	return (
		<div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
			I am BookingManagerTool
		</div>
	);
};

BookingManagerTool.propTypes = {
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
}

export default BookingManagerTool;
