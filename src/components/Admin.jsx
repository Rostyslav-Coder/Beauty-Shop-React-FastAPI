// ============ ADMIN PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import AdminDesktop from './admin/AdminDesktop';
import AdminGetUserByEmail from './admin/AdminGetUserByEmail';
import EmployeeListByProfession from './admin/EmployeeListByProfession';
import AdminCreateEmployee from './admin/AdminCreateEmployee';
import AdminProfessionManager from './admin/AdminProfessionManager';
import '../styles/Admin.css';


const Admin = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const adminName = user.firstName ? user.firstName : user.email;
	const [getUserByEmail, setGetUserByEmail] = useState('');
	const [userDataByEmail, setUserDataByEmail] = useState(null);
	const [createdEmployeeData, setCreatedEmployeeData] = useState(null);
	const [createdProfessionData, setCreatedProfessionData] = useState(null);

	return (
		<section className='admin'>
			<h1 className='admin__title'>Hi {adminName}</h1>
			<div className="admin__wrapper">
				<section className="admin__tools">
					<AdminGetUserByEmail
						userEmail={getUserByEmail}
						setUserEmail={setGetUserByEmail}
						setUserData={setUserDataByEmail}
					/>
					<EmployeeListByProfession />
					<AdminCreateEmployee
						setCreatedEmployeeData={setCreatedEmployeeData}
					/>
					<AdminProfessionManager
						setCreatedProfessionData={setCreatedProfessionData}
					/>
				</section>
				<AdminDesktop
					userData={userDataByEmail}
					createdEmployeeData={createdEmployeeData}
					createdProfessionData={createdProfessionData}
				/>
			</div>
		</section>
	);
};

export default Admin;
