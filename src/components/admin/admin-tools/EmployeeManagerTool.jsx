// ============ EMPLOYEE-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import EmployeeListAll from '../admin-subTools/EmployeeListAll';
import EmployeeListByProfession from '../admin-subTools/EmployeeListByProfession';
import EmployeeNameSearch from '../admin-subTools/EmployeeNameSearch';
import EmployeeCreator from '../admin-subTools/EmployeeCreator';
// import EmployeeNotActive from '../admin-subTools/EmployeeNotActive';


// ! Validated Component
const EmployeeManagerTool = (
  {
    setEmployeeListAll,
    setEmployeeListProf,
    setSearchedEmployeeData,
    setNewEmployeeData,
    // setFormerEmployee,
    setError,
    isOpen,
    onOpen
  }
) => {
  const [openElement, setOpenElement] = useState('');

  return (
    <div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
      <h2>Employee Manager</h2>
      {isOpen && (
        <>
          <div onClick={() => setOpenElement('EmployeeListAll')}>
            <hr className='admin__separator' />
            <h3>All Employees</h3>
            {openElement === 'EmployeeListAll' && (
              <EmployeeListAll
                setEmployeeListAll={setEmployeeListAll}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('EmployeeListByProfession')}>
            <hr className='admin__separator' />
            <h3>Employees By Profession</h3>
            {openElement === 'EmployeeListByProfession' && (
              <EmployeeListByProfession
                setEmployeeListProf={setEmployeeListProf}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement("EmployeeNameSearch")}>
            <hr className='admin__separator' />
            <h3>Get Employee Info</h3>
            {openElement === 'EmployeeNameSearch' && (
              <EmployeeNameSearch
                setSearchedEmployeeData={setSearchedEmployeeData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('EmployeeCreator')}>
            <hr className='admin__separator' />
            <h3>Add New Employee</h3>
            {openElement === 'EmployeeCreator' && (
              <EmployeeCreator
                setNewEmployeeData={setNewEmployeeData}
                setError={setError}
              />
            )}
          </div>
          {/* <div onClick={() => setOpenElement('EmployeeNotActive')}>
            <hr className='admin__separator' />
            <h3>Deactivate Employee</h3>
            {openElement === 'EmployeeNotActive' && (
              <EmployeeNotActive
                setFormerEmployee={setFormerEmployee}
                setError={setError}
              />
            )}
          </div> */}
        </>
      )}
    </div>
  );
};

EmployeeManagerTool.propTypes = {
  setEmployeeListAll: PropTypes.func,
  setEmployeeListProf: PropTypes.func,
  setSearchedEmployeeData: PropTypes.func,
  setNewEmployeeData: PropTypes.func,
  setFormerEmployee: PropTypes.func,
  setError: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default EmployeeManagerTool;
