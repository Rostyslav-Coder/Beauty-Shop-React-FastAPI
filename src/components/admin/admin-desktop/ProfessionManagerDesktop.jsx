// ============ PROFESSION-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const ProfessionManagerDesktop = (
	{
		newProfessionData,
		updatedProfessionData,
		newServiceData,
		updatedServiceData,
		error
	}
) => {
	return (
		<>
			{/* Validated block */}
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
			{/* Validated block */}
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
			{/* Validated block */}
			{newServiceData && (
				<div className='adminData'>
					{console.log('newServiceData: ', newServiceData)}
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
				</div >
			)}
			{updatedServiceData && (
				<div className='adminData'>
					<h2>Updated Service Data:</h2>
					{updatedServiceData.name && (
						<p>Updated service name: {updatedServiceData.name}</p>
					)}
					{updatedServiceData.description && (
						<p>Updated service description: {updatedServiceData.description}</p>
					)}
					{updatedServiceData.minPrice && (
						<p>Updated service minimal price: {updatedServiceData.minPrice}</p>
					)}
					{updatedServiceData.profession.name && (
						<p>Updated service Associated Profession: {updatedServiceData.profession.name}</p>
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
	updatedServiceData: PropTypes.object,
	error: PropTypes.string,
};

export default ProfessionManagerDesktop;
