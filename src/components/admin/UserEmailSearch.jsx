// ============ USER-EMAIL-SEARCH COMPONENT MODULE  ============ //

import axios from 'axios';
import PropTypes from 'prop-types';


const UserEmailSearch = ({ searchedUserEmail, setSearchedUserEmail, setSearchedUserData }) => {
	const handleUserEmailChange = (e) => {
		setSearchedUserEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');

		try {
			const response = await axios({
				method: 'get',
				url: `http://127.0.0.1:8000/admin/employee/user?user_email=${searchedUserEmail}`,
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			setSearchedUserData(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='adminGetUserEmployees'>
			<h2>Get User Info By Email</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>
					Add User Email:
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
}

export default UserEmailSearch;
