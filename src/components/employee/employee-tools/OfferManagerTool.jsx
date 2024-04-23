// ============ OFFER-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';
import OfferCreator from '../employee-subTools/OfferCreator';


const OfferManagerTool = ({ setNewOffer, myData, setError, isOpen, onOpen }) => {
	const [openElement, setOpenElement] = useState('');

	return (
		<div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
			<h2>Offers Manager</h2>
			{isOpen && (
				<>
					<div onClick={() => setOpenElement('OfferCreator')}>
						<hr className='employee__separator' />
						<h3>Add New Offer</h3>
						{openElement === 'OfferCreator' && (
							<OfferCreator
								setNewOffer={setNewOffer}
								myData={myData}
								setError={setError}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};

OfferManagerTool.propTypes = {
	setNewOffer: PropTypes.func,
	myData: PropTypes.object,
	setError: PropTypes.func,
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
};

export default OfferManagerTool;
