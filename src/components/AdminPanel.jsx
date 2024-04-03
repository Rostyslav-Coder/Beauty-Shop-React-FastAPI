// ============ ADMIN PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import AdminDesktop from './admin/AdminDesktop';
import EmployeeNameSearch from './admin/EmployeeNameSearch';
import EmployeeCreator from './admin/EmployeeCreator';
import EmployeeListAll from './admin/EmployeeListAll';
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
	const [employeeListAll, setEmployeeListAll] = useState([]);
	const [employeeListProf, setEmployeeListProf] = useState([]);
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
						setError={setError}
					/>
					<EmployeeNameSearch
						searchedEmployeeName={searchedEmployeeName}
						setSearchedEmployeeName={setSearchedEmployeeName}
						setSearchedEmployeeData={setSearchedEmployeeData}
						setError={setError}
					/>
					<EmployeeListAll
						setEmployeeListAll={setEmployeeListAll}
						setError={setError}
					/>
					<EmployeeListByProfession
						setEmployeeListProf={setEmployeeListProf}
						setError={setError}
					/>
					<EmployeeCreator
						setNewEmployeeData={setNewEmployeeData}
						setError={setError}
					/>
					<ProfessionManager
						setNewProfessionData={setNewProfessionData}
						setError={setError}
					/>
				</section>
				<AdminDesktop
					searchedUserData={searchedUserData}
					searchedEmployeeData={searchedEmployeeData}
					newEmployeeData={newEmployeeData}
					newProfessionData={newProfessionData}
					employeeListProf={employeeListProf}
					employeeListAll={employeeListAll}
					error={error}
				/>
			</div>
		</section>
	);
};

export default AdminPanel;
