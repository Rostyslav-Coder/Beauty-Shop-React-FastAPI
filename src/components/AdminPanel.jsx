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
  const [searchedEmployeeData, setSearchedEmployeeData] = useState(null);
  const [newEmployeeData, setNewEmployeeData] = useState(null);
  const [newProfessionData, setNewProfessionData] = useState(null);
  const [employeeListAll, setEmployeeListAll] = useState([]);
  const [employeeListProf, setEmployeeListProf] = useState([]);
  const [formerEmployee, setFormerEmployee] = useState('');
  const [newServiceData, setNewServiceData] = useState(null);
  const [openComponent, setOpenComponent] = useState('')
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const adminName = user.firstName ? user.firstName : user.email;

  const handleOpen = (ComponentName) => {
    setOpenComponent(ComponentName);
  };

  return (
    <section className='admin'>
      <h1 className='admin__title'>Hi {adminName}</h1>
      <div className='admin__wrapper'>
        <section className='adminTools'>
          <UserManagerTool
            setSearchedUserData={setSearchedUserData}
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
            setNewServiceData={setNewServiceData}
            setError={setError}
            isOpen={openComponent === 'ProfessionManagerTool'}
            onOpen={() => handleOpen('ProfessionManagerTool')}
          />
        </section>
        <section className='adminDesktop'>
          {openComponent === 'UserManagerTool' && (
            <UserManagerDesktop
              searchedUserData={searchedUserData}
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
              newServiceData={newServiceData}
              error={error}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default AdminPanel;
