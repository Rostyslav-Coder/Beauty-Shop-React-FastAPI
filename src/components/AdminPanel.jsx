// ============ ADMIN PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';
import AdminDesktop from './admin/AdminDesktop';
import EmployeeNameSearch from './admin/EmployeeNameSearch';
import EmployeeCreator from './admin/EmployeeCreator';
import EmployeeListAll from './admin/EmployeeListAll';
import EmployeeListByProfession from './admin/EmployeeListByProfession';
import EmployeeNotActive from './admin/EmployeeNotActive';
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
	const [formerEmployee, setFormerEmployee] = useState('');
	const [error, setError] = useState(null);
	const [openComponent, setOpenComponent] = useState('')
	const user = JSON.parse(localStorage.getItem('user'));
	const adminName = user.firstName ? user.firstName : user.email;

	const handleOpen = (ComponentName) => {
		setOpenComponent(ComponentName);
	};

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
						isOpen={openComponent === 'UserEmailSearch'}
						onOpen={() => handleOpen('UserEmailSearch')}
					/>
					<EmployeeNameSearch
						searchedEmployeeName={searchedEmployeeName}
						setSearchedEmployeeName={setSearchedEmployeeName}
						setSearchedEmployeeData={setSearchedEmployeeData}
						setError={setError}
						isOpen={openComponent === 'EmployeeNameSearch'}
						onOpen={() => handleOpen('EmployeeNameSearch')}
					/>
					<EmployeeListAll
						setEmployeeListAll={setEmployeeListAll}
						setError={setError}
						isOpen={openComponent === 'EmployeeListAll'}
						onOpen={() => handleOpen('EmployeeListAll')}
					/>
					<EmployeeListByProfession
						setEmployeeListProf={setEmployeeListProf}
						setError={setError}
						isOpen={openComponent === 'EmployeeListByProfession'}
						onOpen={() => handleOpen('EmployeeListByProfession')}
					/>
					<EmployeeCreator
						setNewEmployeeData={setNewEmployeeData}
						setError={setError}
						isOpen={openComponent === 'EmployeeCreator'}
						onOpen={() => handleOpen('EmployeeCreator')}
					/>
					<EmployeeNotActive
						setFormerEmployee={setFormerEmployee}
						setError={setError}
						isOpen={openComponent === 'EmployeeNotActive'}
						onOpen={() => handleOpen('EmployeeNotActive')}
					/>
					<ProfessionManager
						setNewProfessionData={setNewProfessionData}
						setError={setError}
						isOpen={openComponent === 'ProfessionManager'}
						onOpen={() => handleOpen('ProfessionManager')}
					/>
				</section>
				<AdminDesktop
					searchedUserData={searchedUserData}
					searchedEmployeeData={searchedEmployeeData}
					newEmployeeData={newEmployeeData}
					newProfessionData={newProfessionData}
					employeeListProf={employeeListProf}
					employeeListAll={employeeListAll}
					formerEmployee={formerEmployee}
					error={error}
				/>
			</div>
		</section>
	);
};

export default AdminPanel;
