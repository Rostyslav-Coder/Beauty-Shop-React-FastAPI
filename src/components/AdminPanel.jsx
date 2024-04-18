// ============ ADMIN-PANEL PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';

import EmployeeManagerTool from './admin/admin-tools/EmployeeManagerTool';
import ProfessionManagerTool from './admin/admin-tools/ProfessionManagerTool';
import UserManagerTool from './admin/admin-tools/UserManagerTool';
import EmployeeManagerDesktop from './admin/admin-desktop/EmployeeManagerDesktop';
import ProfessionManagerDesktop from './admin/admin-desktop/ProfessionManagerDesktop';
import UserManagerDesktop from './admin/admin-desktop/UserManagerDesktop';
import '../styles/Admin.css';


const AdminPanel = () => {
  const [searchedUserData, setSearchedUserData] = useState(null);
  const [userListAll, setUserListAll] = useState([]);
  const [employeeListAll, setEmployeeListAll] = useState([]);
  const [employeeListProf, setEmployeeListProf] = useState([]);
  const [searchedEmployeeData, setSearchedEmployeeData] = useState(null);
  const [newEmployeeData, setNewEmployeeData] = useState(null);
  const [formerEmployee, setFormerEmployee] = useState('');
  const [newProfessionData, setNewProfessionData] = useState(null);
  const [updatedProfessionData, setUpdatedProfessionData] = useState('');
  const [newServiceData, setNewServiceData] = useState(null);
  const [updatedServiceData, setUpdatedServiceData] = useState('');
  const [error, setError] = useState(null);
  const [openComponent, setOpenComponent] = useState('');
  const userName = localStorage.getItem('userEmail');

  const handleOpen = (ComponentName) => {
    setOpenComponent(ComponentName);
  };

  return (
    <section className='admin'>
      <h1 className='admin__title'>Hi {userName}</h1>
      <div className='admin__wrapper'>
        <div className='adminTools'>
          <UserManagerTool
            setSearchedUserData={setSearchedUserData}
            setUserListAll={setUserListAll}
            setError={setError}
            isOpen={openComponent === 'UserManagerTool'}
            onOpen={() => handleOpen('UserManagerTool')}
          />
          <EmployeeManagerTool
            setEmployeeListAll={setEmployeeListAll}
            setEmployeeListProf={setEmployeeListProf}
            setSearchedEmployeeData={setSearchedEmployeeData}
            setNewEmployeeData={setNewEmployeeData}
            setFormerEmployee={setFormerEmployee}
            setError={setError}
            isOpen={openComponent === 'EmployeeManagerTool'}
            onOpen={() => handleOpen('EmployeeManagerTool')}
          />
          <ProfessionManagerTool
            setNewProfessionData={setNewProfessionData}
            setUpdatedProfessionData={setUpdatedProfessionData}
            setNewServiceData={setNewServiceData}
            setUpdatedServiceData={setUpdatedServiceData}
            setError={setError}
            isOpen={openComponent === 'ProfessionManagerTool'}
            onOpen={() => handleOpen('ProfessionManagerTool')}
          />
        </div>
        <div className='adminDesktop'>
          {openComponent === 'UserManagerTool' && (
            <UserManagerDesktop
              searchedUserData={searchedUserData}
              userListAll={userListAll}
              error={error}
            />
          )}
          {openComponent === 'EmployeeManagerTool' && (
            <EmployeeManagerDesktop
              employeeListAll={employeeListAll}
              employeeListProf={employeeListProf}
              searchedEmployeeData={searchedEmployeeData}
              newEmployeeData={newEmployeeData}
              formerEmployee={formerEmployee}
              error={error}
            />
          )}
          {openComponent === 'ProfessionManagerTool' && (
            <ProfessionManagerDesktop
              newProfessionData={newProfessionData}
              updatedProfessionData={updatedProfessionData}
              newServiceData={newServiceData}
              updatedServiceData={updatedServiceData}
              error={error}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
