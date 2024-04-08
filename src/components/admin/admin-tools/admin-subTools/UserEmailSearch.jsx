// ============ USER-EMAIL-SEARCH COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';
import sendRequest from '../../../../request/request';

const UserEmailSearch = ({ setSearchedUserData, setError, }) => {
	const [searchedUserEmail, setSearchedUserEmail] = useState('');

	const handleUserEmailChange = (e) => {
		setSearchedUserEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const REQUEST_URL = '/users/get_by_email';
		const data = { user_email: searchedUserEmail };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error)
			} else {
				setSearchedUserData(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>
					Enter User Email:
					<input
						id='email'
						type='email'
						value={searchedUserEmail}
						onChange={handleUserEmailChange}
						required
					/>
				</label>
				<button type='submit'>Get Users Data</button>
			</form>
		</div>
	);
};

UserEmailSearch.propTypes = {
	setSearchedUserData: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onOpen: PropTypes.func.isRequired,
}

export default UserEmailSearch;
