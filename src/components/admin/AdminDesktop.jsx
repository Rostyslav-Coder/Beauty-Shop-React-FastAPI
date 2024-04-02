// ============ ADMIN-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const AdminDesktop = (
	{ searchedUserData, newEmployeeData, newProfessionData }
) => {
	return (
		<section className="adminDesktop">
			{searchedUserData && (
				<div>
					<h2>User Data:</h2>
					<table>
						<caption>User Data</caption>
					</table>
					{searchedUserData.id && (
						<tr>
							<th>User ID:</th>
							<th>{searchedUserData.id}</th>
						</tr>
					)}
					{searchedUserData.firstName && (
						<tr>
							<th>User First Name:</th>
							<th>{searchedUserData.firstName}</th>
						</tr>
					)}
					{searchedUserData.lastName && (
						<tr>
							<th>User Last Name:</th>
							<th>{searchedUserData.lastName}</th>
						</tr>
					)}
					{searchedUserData.email && (
						<tr>
							<th>User Email:</th>
							<th>{searchedUserData.email}</th>
						</tr>
					)}
					{searchedUserData.phoneNumber && (
						<tr>
							<th>User Phone Number:</th>
							<th>{searchedUserData.phoneNumber}</th>
						</tr>
					)}
					{searchedUserData.role && (
						<tr>
							<th>User Role:</th>
							<th>{searchedUserData.role}</th>
						</tr>
					)}
				</div>
			)}
			{newEmployeeData && (
				<div>
					<h2>Created Employee Data:</h2>
					<table>
						<caption>Created Employee Data</caption>
						{newEmployeeData.id && (
							<tr>
								<th>Employee ID:</th>
								<th>{newEmployeeData.id}</th>
							</tr>
						)}
						{newEmployeeData.user.id && (
							<tr>
								<th>Employee User ID:</th>
								<th>{newEmployeeData.user.id}</th>
							</tr>
						)}
						{newEmployeeData.user.firstName && (
							<tr>
								<th>Employee First Name:</th>
								<th>{newEmployeeData.user.firstName}</th>
							</tr>
						)}
						{newEmployeeData.user.lastName && (
							<tr>
								<th>Employee Last Name:</th>
								<th>{newEmployeeData.user.lastName}</th>
							</tr>
						)}
						{newEmployeeData.user.email && (
							<tr>
								<th>Employee Email:</th>
								<th>{newEmployeeData.user.email}</th>
							</tr>
						)}
						{newEmployeeData.user.phoneNumber && (
							<tr>
								<th>Employee Phone Number:</th>
								<th>{newEmployeeData.user.phoneNumber}</th>
							</tr>
						)}
						{newEmployeeData.user.role && (
							<tr>
								<th>Employee Role</th>
								<th>{newEmployeeData.user.role}</th>
							</tr>
						)}
						{newEmployeeData.profession.profession && (
							<tr>
								<th>Employee Profession:</th>
								<th>{newEmployeeData.profession.profession}</th>
							</tr>
						)}
						{newEmployeeData.profession.description && (
							<tr>
								<th>Employee Profession Description:</th>
								<th>{newEmployeeData.profession.description}</th>
							</tr>
						)}
						{newEmployeeData.professionId && (
							<tr>
								<th>Employee Professio ID:</th>
								<th>{newEmployeeData.professionId}</th>
							</tr>
						)}
						{newEmployeeData.workingDays && (
							<tr>
								<th>Employee Working Days:</th>
								<th>{newEmployeeData.workingDays}</th>
							</tr>
						)}
						{newEmployeeData.workingShift && (
							<tr>
								<th>Employee Working Shift:</th>
								<th>{newEmployeeData.workingShift}</th>
							</tr>
						)}
						{newEmployeeData.isActive && (
							<tr>
								<th>Employee Is Active:</th>
								<th>{newEmployeeData.isActive ? 'TRUE' : 'FALSE'}</th>
							</tr>
						)}
					</table>
				</div>
			)}
			{newProfessionData && (
				<div>
					<h2>Created Profession Data:</h2>
					{newProfessionData.profession && (
						<p>New Profession: {newProfessionData.profession}</p>
					)}
					{newProfessionData.description && (
						<p>Profession description: {newProfessionData.description}</p>
					)}
				</div>
			)}
		</section>
	);
};

AdminDesktop.propTypes = {
	searchedUserData: PropTypes.object,
	newEmployeeData: PropTypes.object,
	newProfessionData: PropTypes.object,
};

export default AdminDesktop;