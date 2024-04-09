// ============ PROFESSION-CREATOR COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ProfessionSelect from '../../../official/ProfessionSelect';
import sendRequest from '../../../../request/request';


const ProfessoinUpdater = ({ setUpdatedProfessionData, setError }) => {
	const [updatKay, setUpdatKay] = useState('');
	const [updatValue, setUpdatValue] = useState('');
	const [updatedProfessionId, setUpdatedProfessionId] = useState('');

	const handleUpdateKeyChange = (e) => {
		setUpdatKay(e.target.value);
	};

	const handleUpdateValueChange = (e) => {
		setUpdatValue(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/profession/update';
		const data = {
			profession_id: updatedProfessionId,
			payload_kay: updatKay,
			payload_value: updatValue,
		};

		try {
			const result = await sendRequest('put', REQUEST_URL, data);
			if (result.error) {
				setError(result.error)
			} else {
				setUpdatedProfessionData(result.result)
				setError(null)
			}
		} catch (error) {
			setError(error)
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<ProfessionSelect setProfession={setUpdatedProfessionId} />
				<label htmlFor='key'>
					What`s change:
					<select id='key' onChange={handleUpdateKeyChange} required>
						<option value={null}>Select One</option>
						<option value='name'>Profession Name</option>
						<option value='description'>Profession Description</option>
					</select>
				</label>
				<label htmlFor='value'>
					Add New:
					<input
						id='value'
						type='text'
						value={updatValue}
						onChange={handleUpdateValueChange}
						required
					/>
				</label>
				<button type='submit'>Update Profession</button>
			</form>
		</div>
	);
};

ProfessoinUpdater.propTypes = {
	setUpdatedProfessionData: PropTypes.func,
	setError: PropTypes.func,
};

export default ProfessoinUpdater;
