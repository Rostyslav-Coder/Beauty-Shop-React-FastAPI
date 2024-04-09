// ============ PROFESSION-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ProfessionCreator from './admin-subTools/ProfessionCreator';
import ProfessoinUpdater from './admin-subTools/ProfessionUpdater';
import ServiceCreator from './admin-subTools/ServiceCreator';


const ProfessionManagerTool = (
  {
    setNewProfessionData,
    setUpdatedProfessionData,
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
            <hr />
            <h3>Add New Profession</h3>
            {openElement === 'ProfessionCreator' && (
              <ProfessionCreator
                setNewProfessionData={setNewProfessionData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('ProfessoinUpdater')}>
            <hr />
            <h3>Update Profession</h3>
            {openElement === 'ProfessoinUpdater' && (
              <ProfessoinUpdater
                setUpdatedProfessionData={setUpdatedProfessionData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('ServiceCreator')}>
            <hr />
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
  setUpdatedProfessionData: PropTypes.func,
  setNewServiceData: PropTypes.func,
  setError: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ProfessionManagerTool;
