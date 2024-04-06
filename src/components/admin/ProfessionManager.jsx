// ============ PROFESSION-MANAGER COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const ProfessionManager = ({ setNewProfessionData, setError, isOpen, onOpen }) => {
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

		const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
		const REQUEST_URL = '/profession/add';
		const token = localStorage.getItem('token');
		const auth = {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		};
		const schema = {
			profession: profession,
			description: description,
		}

		try {
			const response = await axios({
				method: 'post',
				url: BASE_URL + REQUEST_URL,
				data: schema,
				headers: auth,
			});
			setNewProfessionData(response.data.result);
			setError(null);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setError('Unauthorized request')
			} else {
				setError('An error occurred while receiving data');
			}
		}
	};

	return (
		<div className={`professionManager component comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
			<h2>Add New Profession</h2>
			{isOpen && (
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
			)}
		</div>
	);
};

ProfessionManager.propTypes = {
	setNewProfessionData: PropTypes.func,
	setError: PropTypes.func,
	isOpen: PropTypes.bool.isRequired,
	onOpen: PropTypes.func.isRequired,
};

export default ProfessionManager;
