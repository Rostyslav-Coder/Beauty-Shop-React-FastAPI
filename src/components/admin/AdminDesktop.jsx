// ============ ADMIN-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const AdminDesktop = (
	{
		employeeListAll,
		employeeListProf,
		formerEmployee,
		newEmployeeData,
		newProfessionData,
		searchedEmployeeData,
		searchedUserData,
		newServiceData,
		error
	}
) => {
	return (
		<section className='adminDesktop'>
			{searchedUserData && (
				<div className='admin__data'>
					<h2>User Data:</h2>
					<table>
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
					</table>
				</div>
			)}
			{searchedEmployeeData && (
				<div className='admin__data'>
					<h2>Employee Data:</h2>
					<table>
						{searchedEmployeeData.user.firstName && (
							<tr>
								<th>Employee First Name:</th>
								<th>{searchedEmployeeData.user.firstName}</th>
							</tr>
						)}
						{searchedEmployeeData.user.lastName && (
							<tr>
								<th>Employee Last Name:</th>
								<th>{searchedEmployeeData.user.lastName}</th>
							</tr>
						)}
						{searchedEmployeeData.profession.profession && (
							<tr>
								<th>Employee Profession:</th>
								<th>{searchedEmployeeData.profession.profession}</th>
							</tr>
						)}
						{searchedEmployeeData.workingDays && (
							<tr>
								<th>Employee Working Days:</th>
								<th>{searchedEmployeeData.workingDays}</th>
							</tr>
						)}
						{searchedEmployeeData.workingShift && (
							<tr>
								<th>Employee Working Shift:</th>
								<th>{searchedEmployeeData.workingShift}</th>
							</tr>
						)}
						{searchedEmployeeData.user.email && (
							<tr>
								<th>Employee Email:</th>
								<th>{searchedEmployeeData.user.email}</th>
							</tr>
						)}
						{searchedEmployeeData.user.phoneNumber && (
							<tr>
								<th>Employee Phone Number:</th>
								<th>{searchedEmployeeData.user.phoneNumber}</th>
							</tr>
						)}
						{searchedEmployeeData.id && (
							<tr>
								<th>Employee ID:</th>
								<th>{searchedEmployeeData.id}</th>
							</tr>
						)}
					</table>
				</div>
			)}
			{newEmployeeData && (
				<div className='admin__data'>
					<h2>Created Employee Data:</h2>
					<table>
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
			{employeeListAll.length > 0 && (
				<div className='admin__data'>
					<h2>Employees</h2>
					{employeeListAll.map((employee, index) => {
						return (
							<table key={`table${index}`}>
								<tr key={`firstName${index}`}>
									<th>First Name</th>
									<th>{employee.user.firstName}</th>
								</tr>
								<tr key={`lastName${index}`}>
									<th>Last Name</th>
									<th>{employee.user.lastName}</th>
								</tr>
								<tr key={`email${index}`}>
									<th>Email</th>
									<th>{employee.user.email}</th>
								</tr>
								<tr key={`phoneNumber${index}`}>
									<th>Phone Number</th>
									<th>{employee.user.phoneNumber}</th>
								</tr>
								<tr key={`workingDays${index}`}>
									<th>Working Days</th>
									<th>{employee.workingDays}</th>
								</tr>
								<tr key={`workingSift${index}`}>
									<th>Working Shift</th>
									<th>{employee.workingShift}</th>
								</tr>
								<tr key={`employeeId${index}`}>
									<th>Employee Id</th>
									<th>{employee.id}</th>
								</tr>
								<tr key={`userId${index}`}>
									<th>User Id</th>
									<th>{employee.user.id}</th>
								</tr>
							</table>
						)
					})}
				</div>
			)}
			{employeeListProf.length > 0 && (
				<div className='admin__data'>
					<h2>Employee with Professon: {employeeListProf[0].profession.profession}</h2>
					{employeeListProf.map((employee, index) => {
						return (
							<table key={`table${index}`}>
								<tr key={`firstName${index}`}>
									<th>First Name</th>
									<th>{employee.user.firstName}</th>
								</tr>
								<tr key={`lastName${index}`}>
									<th>Last Name</th>
									<th>{employee.user.lastName}</th>
								</tr>
								<tr key={`email${index}`}>
									<th>Email</th>
									<th>{employee.user.email}</th>
								</tr>
								<tr key={`phoneNumber${index}`}>
									<th>Phone Number</th>
									<th>{employee.user.phoneNumber}</th>
								</tr>
								<tr key={`workingDays${index}`}>
									<th>Working Days</th>
									<th>{employee.workingDays}</th>
								</tr>
								<tr key={`workingSift${index}`}>
									<th>Working Shift</th>
									<th>{employee.workingShift}</th>
								</tr>
								<tr key={`employeeId${index}`}>
									<th>Employee Id</th>
									<th>{employee.id}</th>
								</tr>
								<tr key={`userId${index}`}>
									<th>User Id</th>
									<th>{employee.user.id}</th>
								</tr>
							</table>
						)
					})}
				</div>
			)}
			{newProfessionData && (
				<div className='admin__data'>
					<h2>Created Profession Data:</h2>
					{newProfessionData.name && (
						<p>New Profession: {newProfessionData.name}</p>
					)}
					{newProfessionData.description && (
						<p>Profession description: {newProfessionData.description}</p>
					)}
				</div>
			)}
			{formerEmployee && (
				<div className='admin__data'>
					<h2>Dismissed Employee:</h2>
					<table>
						{formerEmployee.firstName && (
							<tr>
								<th>User First Name:</th>
								<th>{formerEmployee.firstName}</th>
							</tr>
						)}
						{formerEmployee.lastName && (
							<tr>
								<th>User Last Name:</th>
								<th>{formerEmployee.lastName}</th>
							</tr>
						)}
						{formerEmployee.email && (
							<tr>
								<th>User Email:</th>
								<th>{formerEmployee.email}</th>
							</tr>
						)}
						{formerEmployee.phoneNumber && (
							<tr>
								<th>User Phone Number:</th>
								<th>{formerEmployee.phoneNumber}</th>
							</tr>
						)}
						{formerEmployee.id && (
							<tr>
								<th>User ID:</th>
								<th>{formerEmployee.id}</th>
							</tr>
						)}
						{formerEmployee.role && (
							<tr>
								<th>User Role:</th>
								<th>{formerEmployee.role}</th>
							</tr>
						)}
					</table>
				</div>
			)}
			{newServiceData && (
				<div className='admin__data'>
					<h2>Created Service Data:</h2>
					{newServiceData.name && (
						<p>New Service: {newServiceData.name}</p>
					)}
					{newServiceData.description && (
						<p>Service description: {newServiceData.description}</p>
					)}
					{newServiceData.minPrice && (
						<p>Service minimal price: {newServiceData.minPrice}</p>
					)}
					{newServiceData.profession.name && (
						<p>Service Associated Profession: {newServiceData.profession.name}</p>
					)}
				</div>
			)}
			{error && <p>{error}</p>}
		</section>
	);
};

AdminDesktop.propTypes = {
	employeeListAll: PropTypes.array,
	employeeListProf: PropTypes.array,
	formerEmployee: PropTypes.object,
	newEmployeeData: PropTypes.object,
	newProfessionData: PropTypes.object,
	searchedEmployeeData: PropTypes.object,
	searchedUserData: PropTypes.object,
	newServiceData: PropTypes.object,
	error: PropTypes.string,
};

export default AdminDesktop;
