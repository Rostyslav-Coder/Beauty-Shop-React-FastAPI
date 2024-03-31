// ============ ADMIN PAGE COMPONENT MODULE  ============ //

import AdminGetUserEmployee from './admin/AdminGetUserEmployee';
import AdminCreateEmployee from './admin/AdminCreateEmployee';
import AdminProfessionManager from './admin/AdminProfessionManager';
import '../styles/Admin.css';


const Admin = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const adminName = user.firstName ? user.firstName : user.email;

	return (
		<div className='admin'>
			<h1 className='admin__title'>Hi {adminName}</h1>
			<AdminGetUserEmployee />
			<AdminCreateEmployee />
			<AdminProfessionManager />
		</div>
	);
};

export default Admin;
