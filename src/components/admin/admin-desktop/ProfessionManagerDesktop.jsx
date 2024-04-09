// ============ PROFESSION-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const ProfessionManagerDesktop = (
	{
		newProfessionData,
		updatedProfessionData,
		newServiceData,
		error
	}
) => {
	return (
		<>
			{newProfessionData && (
				<div className='adminData'>
					<h2>Created Profession Data:</h2>
					{newProfessionData.name && (
						<p>New Profession: {newProfessionData.name}</p>
					)}
					{newProfessionData.description && (
						<p>Profession description: {newProfessionData.description}</p>
					)}
				</div>
			)}
			{updatedProfessionData && (
				<div className='adminData'>
					<h2>Updated Profession Data:</h2>
					{updatedProfessionData.name && (
						<p>New Profession: {updatedProfessionData.name}</p>
					)}
					{updatedProfessionData.description && (
						<p>Profession description: {updatedProfessionData.description}</p>
					)}
				</div>
			)}
			{newServiceData && (
				<div className='adminData'>
					<h2>Created Service Data:</h2>
					{newServiceData.name && (
						<p>New Service: {newServiceData.name}</p>
					)}
					{newServiceData.description && (
						<p>Service description: {newServiceData.description}</p>
					)}
					{newServiceData.minPrice && (
						<p>Service minimal price: {newServiceData.minPrice}</p>
					)}
					{newServiceData.profession.name && (
						<p>Service Associated Profession: {newServiceData.profession.name}</p>
					)}
				</div>
			)}
			{error && <p>{error}</p>}
		</>
	);
};

ProfessionManagerDesktop.propTypes = {
	newProfessionData: PropTypes.object,
	updatedProfessionData: PropTypes.object,
	newServiceData: PropTypes.object,
	error: PropTypes.string,
};

export default ProfessionManagerDesktop;
