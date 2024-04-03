// ============ ADMIN PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import AdminDesktop from './admin/AdminDesktop';
import EmployeeNameSearch from './admin/EmployeeNameSearch';
import EmployeeCreator from './admin/EmployeeCreator';
import EmployeeListByProfession from './admin/EmployeeListByProfession';
import ProfessionManager from './admin/ProfessionManager';
import UserEmailSearch from './admin/UserEmailSearch';
import '../styles/Admin.css';


const AdminPanel = () => {
	const [searchedUserEmail, setSearchedUserEmail] = useState('');
	const [searchedUserData, setSearchedUserData] = useState(null);
	const [searchedEmployeeName, setSearchedEmployeeName] = useState('');
	const [searchedEmployeeData, setSearchedEmployeeData] = useState(null);
	const [newEmployeeData, setNewEmployeeData] = useState(null);
	const [newProfessionData, setNewProfessionData] = useState(null);
	const [employeeList, setEmployeeList] = useState([]);
	const [error, setError] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'));
	const adminName = user.firstName ? user.firstName : user.email;

	return (
		<section className='admin'>
			<h1 className='admin__title'>Hi {adminName}</h1>
			<div className="admin__wrapper">
				<section className="admin__tools">
					<UserEmailSearch
						searchedUserEmail={searchedUserEmail}
						setSearchedUserEmail={setSearchedUserEmail}
						setSearchedUserData={setSearchedUserData}
					/>
					<EmployeeNameSearch
						searchedEmployeeName={searchedEmployeeName}
						setSearchedEmployeeName={setSearchedEmployeeName}
						setSearchedEmployeeData={setSearchedEmployeeData}
						setError={setError}
					/>
					<EmployeeListByProfession
						setEmployeeList={setEmployeeList}
						setError={setError}
					/>
					<EmployeeCreator
						setNewEmployeeData={setNewEmployeeData}
					/>
					<ProfessionManager
						setNewProfessionData={setNewProfessionData}
					/>
				</section>
				<AdminDesktop
					searchedUserData={searchedUserData}
					searchedEmployeeData={searchedEmployeeData}
					newEmployeeData={newEmployeeData}
					newProfessionData={newProfessionData}
					employeeList={employeeList}
					error={error}
				/>
			</div>
		</section>
	);
};

export default AdminPanel;
