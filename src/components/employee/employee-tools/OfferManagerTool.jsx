// ============ OFFER-MANAGER-TOOL COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const OfferManagerTool = ({ isOpen, onOpen }) => {
	return (
		<div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
			I am OfferManagerTool
		</div>
	);
};

OfferManagerTool.propTypes = {
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
};

export default OfferManagerTool;
