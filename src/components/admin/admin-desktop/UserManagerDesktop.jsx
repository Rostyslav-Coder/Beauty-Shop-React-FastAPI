// ============ USER-MANAGER-DESKTOP COMPONENT MODULE  ============ //

import PropTypes from 'prop-types';


const UserManagerDesktop = ({ searchedUserData, error }) => {
  return (
    <>
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
      {error && <p>error</p>}
    </>
  );
};

UserManagerDesktop.propTypes = {
  searchedUserData: PropTypes.object,
  error: PropTypes.string,
};

export default UserManagerDesktop;