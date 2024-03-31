// ============ ADMIN-GET-USER-BY-EMAIL COMPONENT MODULE  ============ //

import axios from 'axios';
import PropTypes from 'prop-types';


const AdminGetUserByEmail = ({ userEmail, setUserEmail, setUserData }) => {
	const handleInputEmailChange = (e) => {
		setUserEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');

		try {
			const response = await axios({
				method: 'get',
				url: `http://127.0.0.1:8000/admin/employee/user?user_email=${userEmail}`,
				headers: {
					'Authorization': `Bearer ${token}`,
					// 'Content-Type': 'application/json',
				},
			});
			setUserData(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='adminGetUserEmployees'>
			<h2>Get User Info By Email</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor=''>
					Add User Email:
					<input
						type='email'
						value={userEmail}
						onChange={handleInputEmailChange}
						required
					/>
				</label>
				<button type='submit'>Get Users Data</button>
			</form>
		</div>
	);
};

AdminGetUserByEmail.propTypes = {
	userEmail: PropTypes.string,
	setUserEmail: PropTypes.func.isRequired,
	setUserData: PropTypes.func.isRequired,
}

export default AdminGetUserByEmail;
