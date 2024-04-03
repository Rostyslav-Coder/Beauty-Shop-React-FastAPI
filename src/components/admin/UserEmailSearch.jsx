// ============ USER-EMAIL-SEARCH COMPONENT MODULE  ============ //

import axios from 'axios';
import PropTypes from 'prop-types';


const UserEmailSearch = (
	{
		searchedUserEmail,
		setSearchedUserEmail,
		setSearchedUserData,
		setError
	}
) => {
	const handleUserEmailChange = (e) => {
		setSearchedUserEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
		const REQUEST_URL = '/admin/employee/user';
		const token = localStorage.getItem('token');
		const auth = { 'Authorization': `Bearer ${token}`, };
		let request = `?user_email=${searchedUserEmail}`;

		try {
			const response = await axios({
				method: 'get',
				url: BASE_URL + REQUEST_URL + request,
				headers: auth,
			});
			setSearchedUserData(response.data.result);
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
		<div className='userEmailSearch'>
			<h2>Get User Info</h2>
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
	searchedUserEmail: PropTypes.string,
	setSearchedUserEmail: PropTypes.func.isRequired,
	setSearchedUserData: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
}

export default UserEmailSearch;
