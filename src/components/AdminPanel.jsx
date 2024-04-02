// ============ ADMIN PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import AdminDesktop from './admin/AdminDesktop';
import UserEmailSearch from './admin/UserEmailSearch';
import EmployeeListByProfession from './admin/EmployeeListByProfession';
import EmployeeCreator from './admin/EmployeeCreator';
import ProfessionManager from './admin/ProfessionManager';
import '../styles/Admin.css';


const AdminPanel = () => {
	const [searchedUserEmail, setSearchedUserEmail] = useState('');
	const [searchedUserData, setSearchedUserData] = useState(null);
	const [newEmployeeData, setNewEmployeeData] = useState(null);
	const [newProfessionData, setNewProfessionData] = useState(null);
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
					<EmployeeListByProfession />
					<EmployeeCreator
						setNewEmployeeData={setNewEmployeeData}
					/>
					<ProfessionManager
						setNewProfessionData={setNewProfessionData}
					/>
				</section>
				<AdminDesktop
					searchedUserData={searchedUserData}
					newEmployeeData={newEmployeeData}
					newProfessionData={newProfessionData}
				/>
			</div>
		</section>
	);
};

export default AdminPanel;
