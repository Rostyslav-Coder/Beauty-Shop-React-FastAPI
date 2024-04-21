// ============ USER-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import UserEmailSearch from '../admin-subTools/UserEmailSearch';
import UserListAll from '../admin-subTools/UserListAll';


const UserManagerTool = (
  {
    setSearchedUserData,
    setUserListAll,
    setError,
    isOpen,
    onOpen
  }
) => {
  const [openElement, setOpenElement] = useState('');

  return (
    <div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
      <h2>Users Manager</h2>
      {isOpen && (
        <>
          <div onClick={() => setOpenElement('UserEmailSearch')}>
            <hr className='admin__separator' />
            <h3>User Info</h3>
            {openElement === 'UserEmailSearch' && (
              <UserEmailSearch
                setSearchedUserData={setSearchedUserData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('UserListAll')}>
            <hr className='admin__separator' />
            <h3>Users List</h3>
            {openElement === 'UserListAll' && (
              <UserListAll
                setUserListAll={setUserListAll}
                setError={setError}
              />
            )}
          </div>
        </>
      )}
    </div>

  );
};

UserManagerTool.propTypes = {
  setSearchedUserData: PropTypes.func,
  setUserListAll: PropTypes.func,
  setError: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
}
export default UserManagerTool;
