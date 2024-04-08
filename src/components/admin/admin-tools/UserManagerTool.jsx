// ============ USER-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import UserEmailSearch from './admin-subTools/UserEmailSearch';


const UserManagerTool = (
  {
    setSearchedUserData,
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
            <h3>User Info</h3>
            {openElement === 'UserEmailSearch' && (
              <UserEmailSearch
                setSearchedUserData={setSearchedUserData}
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
  setSearchedUserData: PropTypes.func.isRequired,
  setError: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
}
export default UserManagerTool;
