// ============ ADMIN-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const AdminDesktop = ({ userData }) => {
	return (
		<section className="adminDesktop">
			<div>
				{userData && (
					<div>
						<h2>User Data:</h2>
						{userData.id && <p>User ID: {userData.id}</p>}
						{userData.firstName && <p>User First Name: {userData.firstName}</p>}
						{userData.lastName && <p>User Last Name: {userData.lastName}</p>}
						{userData.email && <p>User Email: {userData.email}</p>}
						{userData.phoneNumber && <p>User Phone Number: {userData.phoneNumber}</p>}
						{userData.role && <p>User Role: {userData.role}</p>}
					</div>
				)}
			</div>
		</section>
	);
};

AdminDesktop.propTypes = {
	userData: PropTypes.object,
}
export default AdminDesktop;