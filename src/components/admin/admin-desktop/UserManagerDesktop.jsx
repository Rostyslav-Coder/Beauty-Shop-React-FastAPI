// ============ USER-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


// ! Validated Component
const UserManagerDesktop = ({ searchedUserData, userListAll, error }) => {
  return (
    <>
      {/* Validated block */}
      {searchedUserData && (
        <div className='adminData'>
          <h2>User Data:</h2>
          <table>
            {searchedUserData.firstName && (
              <tr>
                <th>First Name:</th>
                <th>{searchedUserData.firstName}</th>
              </tr>
            )}
            {searchedUserData.lastName && (
              <tr>
                <th>Last Name:</th>
                <th>{searchedUserData.lastName}</th>
              </tr>
            )}
            {searchedUserData.email && (
              <tr>
                <th>Email:</th>
                <th>{searchedUserData.email}</th>
              </tr>
            )}
            {searchedUserData.phoneNumber && (
              <tr>
                <th>Phone Number:</th>
                <th>{searchedUserData.phoneNumber}</th>
              </tr>
            )}
            {searchedUserData.role && (
              <tr>
                <th>User Role:</th>
                <th>{searchedUserData.role}</th>
              </tr>
            )}
            {searchedUserData.id && (
              <tr>
                <th>User ID:</th>
                <th>{searchedUserData.id}</th>
              </tr>
            )}
          </table>
        </div>
      )}
      {/* Validated block */}
      {userListAll.length > 0 && (
        <div className='adminData'>
          <h2>User List:</h2>
          <table>
            {userListAll.map((user, index) => (
              <>
                <tr key={`index-${index}`}>
                  <th colSpan={2} style={{ textAlign: 'center' }}>
                    User {index + 1}
                  </th>
                </tr>
                <tr key={`firstName-${index}`}>
                  <th>First Name:</th>
                  <th>{user.firstName}</th>
                </tr>
                <tr key={`lastName-${index}`}>
                  <th>Last Name:</th>
                  <th>{user.lastName}</th>
                </tr>
                <tr key={`email-${index}`}>
                  <th>Email:</th>
                  <th>{user.email}</th>
                </tr>
                <tr key={`phoneNumber-${index}`}>
                  <th>Phone Number:</th>
                  <th>{user.phoneNumber}</th>
                </tr>
                <tr key={`role-${index}`}>
                  <th>User Role:</th>
                  <th>{user.role}</th>
                </tr>
                <tr key={`id-${index}`}>
                  <th>User ID:</th>
                  <th>{user.id}</th>
                </tr>
              </>
            ))}
          </table>
        </div>
      )}
      {error && <p>error</p>}
    </>
  );
};

UserManagerDesktop.propTypes = {
  searchedUserData: PropTypes.object,
  userListAll: PropTypes.array,
  error: PropTypes.string,
};

export default UserManagerDesktop;
