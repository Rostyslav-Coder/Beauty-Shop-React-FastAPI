// ============ OFFER-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import OfferCreator from '../employee-subTools/OfferCreator';
import OfferListAll from '../employee-subTools/OfferListAll';


// ! Validated Component
const OfferManagerTool = ({
	setNewOffer,
	setOffers,
	setServiceInfo,
	myData,
	setError,
	isOpen,
	onOpen
}) => {
	const [openElement, setOpenElement] = useState('');

	return (
		<div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
			<h2>Offers Manager</h2>
			{isOpen && (
				<>
					<div onClick={() => setOpenElement('OfferListAll')}>
						<hr className='employee__separator' />
						<h3>My Offers</h3>
						{openElement === 'OfferListAll' && (
							<OfferListAll
								setOffers={setOffers}
								myData={myData}
								setError={setError}
							/>
						)}
					</div>
					<div onClick={() => setOpenElement('OfferCreator')}>
						<hr className='employee__separator' />
						<h3>Add New Offer</h3>
						{openElement === 'OfferCreator' && (
							<OfferCreator
								setNewOffer={setNewOffer}
								setServiceInfo={setServiceInfo}
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
	setOffers: PropTypes.func,
	setServiceInfo: PropTypes.func,
	myData: PropTypes.object,
	setError: PropTypes.func,
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
};

export default OfferManagerTool;
