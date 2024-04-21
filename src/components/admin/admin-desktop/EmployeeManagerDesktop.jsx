// ============ EMPLOYEE-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const EmployeeManagerDesktop = (
  {
    employeeListAll,
    employeeListProf,
    searchedEmployeeData,
    newEmployeeData,
    formerEmployee,
    error
  }
) => {
  return (
    <>
      {/* Validated block */}
      {employeeListAll.length > 0 && (
        <div className='adminData'>
          <h2>Employees</h2>
          {employeeListAll.map((employee, index) => {
            return (
              <table key={`table${index}`}>
                <tr key={`firstName${index}`}>
                  <th>First Name</th>
                  <th>{employee.user.firstName}</th>
                </tr>
                <tr key={`lastName${index}`}>
                  <th>Last Name</th>
                  <th>{employee.user.lastName}</th>
                </tr>
                <tr key={`email${index}`}>
                  <th>Email</th>
                  <th>{employee.user.email}</th>
                </tr>
                <tr key={`phoneNumber${index}`}>
                  <th>Phone Number</th>
                  <th>{employee.user.phoneNumber}</th>
                </tr>
                <tr key={`profession${index}`}>
                  <th>Profession</th>
                  <th>{employee.profession.name}</th>
                </tr>
                <tr key={`workingDays${index}`}>
                  <th>Working Days</th>
                  <th>{employee.workingDays}</th>
                </tr>
                <tr key={`workingSift${index}`}>
                  <th>Working Shift</th>
                  <th>{employee.workingShift}</th>
                </tr>
              </table>
            )
          })}
        </div>
      )}
      {employeeListProf.length > 0 && (
        <div className='adminData'>
          <h2>Employee with Professon: {employeeListProf[0].profession.profession}</h2>
          {employeeListProf.map((employee, index) => {
            return (
              <table key={`table${index}`}>
                <tr key={`firstName${index}`}>
                  <th>First Name</th>
                  <th>{employee.user.firstName}</th>
                </tr>
                <tr key={`lastName${index}`}>
                  <th>Last Name</th>
                  <th>{employee.user.lastName}</th>
                </tr>
                <tr key={`email${index}`}>
                  <th>Email</th>
                  <th>{employee.user.email}</th>
                </tr>
                <tr key={`phoneNumber${index}`}>
                  <th>Phone Number</th>
                  <th>{employee.user.phoneNumber}</th>
                </tr>
                <tr key={`workingDays${index}`}>
                  <th>Working Days</th>
                  <th>{employee.workingDays}</th>
                </tr>
                <tr key={`workingSift${index}`}>
                  <th>Working Shift</th>
                  <th>{employee.workingShift}</th>
                </tr>
                <tr key={`employeeId${index}`}>
                  <th>Employee Id</th>
                  <th>{employee.id}</th>
                </tr>
                <tr key={`userId${index}`}>
                  <th>User Id</th>
                  <th>{employee.user.id}</th>
                </tr>
              </table>
            )
          })}
        </div>
      )}
      {searchedEmployeeData && (
        <div className='adminData'>
          <h2>Employee Data:</h2>
          <table>
            {searchedEmployeeData.user.firstName && (
              <tr>
                <th>First Name:</th>
                <th>{searchedEmployeeData.user.firstName}</th>
              </tr>
            )}
            {searchedEmployeeData.user.lastName && (
              <tr>
                <th>Last Name:</th>
                <th>{searchedEmployeeData.user.lastName}</th>
              </tr>
            )}
            {searchedEmployeeData.profession.profession && (
              <tr>
                <th>Profession:</th>
                <th>{searchedEmployeeData.profession.profession}</th>
              </tr>
            )}
            {searchedEmployeeData.workingDays && (
              <tr>
                <th>Working Days:</th>
                <th>{searchedEmployeeData.workingDays}</th>
              </tr>
            )}
            {searchedEmployeeData.workingShift && (
              <tr>
                <th>Working Shift:</th>
                <th>{searchedEmployeeData.workingShift}</th>
              </tr>
            )}
            {searchedEmployeeData.user.email && (
              <tr>
                <th>Email:</th>
                <th>{searchedEmployeeData.user.email}</th>
              </tr>
            )}
            {searchedEmployeeData.user.phoneNumber && (
              <tr>
                <th>Phone Number:</th>
                <th>{searchedEmployeeData.user.phoneNumber}</th>
              </tr>
            )}
            {searchedEmployeeData.id && (
              <tr>
                <th>Employee ID:</th>
                <th>{searchedEmployeeData.id}</th>
              </tr>
            )}
          </table>
        </div>
      )}
      {/* Validated block */}
      {newEmployeeData && (
        <div className='adminData'>
          <h2>Created Employee Data:</h2>
          {/* {console.log('newEmployeeData: ', newEmployeeData)} */}
          <table>
            {newEmployeeData.user.firstName && (
              <tr>
                <th>First Name:</th>
                <th>{newEmployeeData.user.firstName}</th>
              </tr>
            )}
            {newEmployeeData.user.lastName && (
              <tr>
                <th>Last Name:</th>
                <th>{newEmployeeData.user.lastName}</th>
              </tr>
            )}
            {newEmployeeData.user.email && (
              <tr>
                <th>Email:</th>
                <th>{newEmployeeData.user.email}</th>
              </tr>
            )}
            {newEmployeeData.user.phoneNumber && (
              <tr>
                <th>Phone Number:</th>
                <th>{newEmployeeData.user.phoneNumber}</th>
              </tr>
            )}
            {newEmployeeData.profession.name && (
              <tr>
                <th>Profession:</th>
                <th>{newEmployeeData.profession.name}</th>
              </tr>
            )}
            {newEmployeeData.workingDays && (
              <tr>
                <th>Working Days:</th>
                <th>{newEmployeeData.workingDays}</th>
              </tr>
            )}
            {newEmployeeData.workingShift && (
              <tr>
                <th>Working Shift:</th>
                <th>{newEmployeeData.workingShift}</th>
              </tr>
            )}
          </table>
        </div>
      )}
      {formerEmployee && (
        <div className='adminData'>
          <h2>Dismissed Employee:</h2>
          <table>
            {formerEmployee.firstName && (
              <tr>
                <th>First Name:</th>
                <th>{formerEmployee.firstName}</th>
              </tr>
            )}
            {formerEmployee.lastName && (
              <tr>
                <th>Last Name:</th>
                <th>{formerEmployee.lastName}</th>
              </tr>
            )}
            {formerEmployee.email && (
              <tr>
                <th>Email:</th>
                <th>{formerEmployee.email}</th>
              </tr>
            )}
            {formerEmployee.phoneNumber && (
              <tr>
                <th>Phone Number:</th>
                <th>{formerEmployee.phoneNumber}</th>
              </tr>
            )}
            {formerEmployee.role && (
              <tr>
                <th>User Role:</th>
                <th>{formerEmployee.role}</th>
              </tr>
            )}
            {formerEmployee.id && (
              <tr>
                <th>User ID:</th>
                <th>{formerEmployee.id}</th>
              </tr>
            )}
          </table>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

EmployeeManagerDesktop.propTypes = {
  employeeListAll: PropTypes.array,
  employeeListProf: PropTypes.array,
  searchedEmployeeData: PropTypes.object,
  newEmployeeData: PropTypes.object,
  formerEmployee: PropTypes.object,
  error: PropTypes.string,
};

export default EmployeeManagerDesktop;
