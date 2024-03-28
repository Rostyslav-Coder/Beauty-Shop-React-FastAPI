// ============ ADMIN PAGE COMPONENT MODULE  ============ //

import AdminEmployees from './AdminEmployees';
import '../styles/Admin.css';


const Admin = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const adminName = user.firstName ? user.firstName : user.email;

	return (
		<div className='admin'>
			<h1 className='admin__title'>Hi {adminName}</h1>
			<AdminEmployees />
		</div>
	);
};

export default Admin;
