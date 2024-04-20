// ============ PROFESSION-CREATOR COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import sendRequest from '../../../request/request';

// ! Validated Component
const ProfessionCreator = ({ setNewProfessionData, setError }) => {
	const [profession, setProfession] = useState('');
	const [description, setDescription] = useState('');

	const handleProfessionChange = (e) => {
		setProfession(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/professions/create';
		const schema = {
			name: profession.toUpperCase(),
			description: description,
		};

		try {
			const result = await sendRequest('post', REQUEST_URL, schema);
			if (result.error) {
				setError(result.error)
			} else {
				setNewProfessionData(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='profession'>
					Add new profession:
					<input
						id='profession'
						type='text'
						value={profession}
						onChange={handleProfessionChange}
						required
					/>
				</label>
				<label htmlFor='description'>
					Add profession description:
					<input
						id='description'
						type='text'
						value={description}
						onChange={handleDescriptionChange}
					/>
				</label>
				<button type='submit'>Create Profession</button>
			</form>
		</div>
	);
};

ProfessionCreator.propTypes = {
	setNewProfessionData: PropTypes.func,
	setError: PropTypes.func,
};

export default ProfessionCreator;
