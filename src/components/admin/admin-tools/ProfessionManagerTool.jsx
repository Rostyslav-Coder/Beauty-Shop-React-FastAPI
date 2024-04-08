// ============ PROFESSION-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ProfessionCreator from './admin-subTools/ProfessionCreator';
import ServiceCreator from './admin-subTools/ServiceCreator';


const ProfessionManagerTool = (
  {
    setNewProfessionData,
    setNewServiceData,
    setError,
    isOpen,
    onOpen
  }
) => {
  const [openElement, setOpenElement] = useState('');

  return (
    <div className={`toolComponent comp__${isOpen ? 'open' : 'closed'}`} onClick={onOpen}>
      <h2>Profession & Service Manager</h2>
      {isOpen && (
        <>
          <div onClick={() => setOpenElement('ProfessionCreator')}>
            <h3>Add New Profession</h3>
            {openElement === 'ProfessionCreator' && (
              <ProfessionCreator
                setNewProfessionData={setNewProfessionData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('ServiceCreator')}>
            <h3>Add New Service</h3>
            {openElement === 'ServiceCreator' && (
              <ServiceCreator
                setNewServiceData={setNewServiceData}
                setError={setError}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

ProfessionManagerTool.propTypes = {
  setNewProfessionData: PropTypes.func,
  setNewServiceData: PropTypes.func,
  setError: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ProfessionManagerTool;
