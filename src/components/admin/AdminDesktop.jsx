// ============ ADMIN-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const AdminDesktop = ({ userData, createdEmployeeData }) => {
	return (
		<section className="adminDesktop">
			{userData && (
				<div>
					<h2>User Data:</h2>
					<table>
						<caption>User Data</caption>
					</table>
					{userData.id && (
						<tr>
							<th>User ID:</th>
							<th>{userData.id}</th>
						</tr>
					)}
					{userData.firstName && (
						<tr>
							<th>User First Name:</th>
							<th>{userData.firstName}</th>
						</tr>
					)}
					{userData.lastName && (
						<tr>
							<th>User Last Name:</th>
							<th>{userData.lastName}</th>
						</tr>
					)}
					{userData.email && (
						<tr>
							<th>User Email:</th>
							<th>{userData.email}</th>
						</tr>
					)}
					{userData.phoneNumber && (
						<tr>
							<th>User Phone Number:</th>
							<th>{userData.phoneNumber}</th>
						</tr>
					)}
					{userData.role && (
						<tr>
							<th>User Role:</th>
							<th>{userData.role}</th>
						</tr>
					)}
				</div>
			)}
			{createdEmployeeData && (
				<div>
					<h2>Created Employee Data:</h2>
					<table>
						<caption>Created Employee Data</caption>
						{createdEmployeeData.id && (
							<tr>
								<th>Employee ID:</th>
								<th>{createdEmployeeData.id}</th>
							</tr>
						)}
						{createdEmployeeData.user.id && (
							<tr>
								<th>Employee User ID:</th>
								<th>{createdEmployeeData.user.id}</th>
							</tr>
						)}
						{createdEmployeeData.user.firstName && (
							<tr>
								<th>Employee First Name:</th>
								<th>{createdEmployeeData.user.firstName}</th>
							</tr>
						)}
						{createdEmployeeData.user.lastName && (
							<tr>
								<th>Employee Last Name:</th>
								<th>{createdEmployeeData.user.lastName}</th>
							</tr>
						)}
						{createdEmployeeData.user.email && (
							<tr>
								<th>Employee Email:</th>
								<th>{createdEmployeeData.user.email}</th>
							</tr>
						)}
						{createdEmployeeData.user.phoneNumber && (
							<tr>
								<th>Employee Phone Number:</th>
								<th>{createdEmployeeData.user.phoneNumber}</th>
							</tr>
						)}
						{createdEmployeeData.user.role && (
							<tr>
								<th>Employee Role</th>
								<th>{createdEmployeeData.user.role}</th>
							</tr>
						)}
						{createdEmployeeData.profession.profession && (
							<tr>
								<th>Employee Profession:</th>
								<th>{createdEmployeeData.profession.profession}</th>
							</tr>
						)}
						{createdEmployeeData.profession.description && (
							<tr>
								<th>Employee Profession Description:</th>
								<th>{createdEmployeeData.profession.description}</th>
							</tr>
						)}
						{createdEmployeeData.professionId && (
							<tr>
								<th>Employee Professio ID:</th>
								<th>{createdEmployeeData.professionId}</th>
							</tr>
						)}
						{createdEmployeeData.workingDays && (
							<tr>
								<th>Employee Working Days:</th>
								<th>{createdEmployeeData.workingDays}</th>
							</tr>
						)}
						{createdEmployeeData.workingShift && (
							<tr>
								<th>Employee Working Shift:</th>
								<th>{createdEmployeeData.workingShift}</th>
							</tr>
						)}
						{createdEmployeeData.isActive && (
							<tr>
								<th>Employee Is Active:</th>
								<th>{createdEmployeeData.isActive ? 'TRUE' : 'FALSE'}</th>
							</tr>
						)}
					</table>
				</div>
			)}
		</section>
	);
};

AdminDesktop.propTypes = {
	userData: PropTypes.object,
	createdEmployeeData: PropTypes.object,
}
export default AdminDesktop;