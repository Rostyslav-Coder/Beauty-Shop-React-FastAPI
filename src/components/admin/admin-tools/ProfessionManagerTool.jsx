// ============ PROFESSION-MANAGER-TOOL COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ProfessionCreator from '../admin-subTools/ProfessionCreator';
import ProfessoinUpdater from '../admin-subTools/ProfessionUpdater';
import ServiceCreator from '../admin-subTools/ServiceCreator';
import ServiceUpdater from '../admin-subTools/ServiceUpdater';


const ProfessionManagerTool = (
  {
    setNewProfessionData,
    setUpdatedProfessionData,
    setNewServiceData,
    setUpdatedServiceData,
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
            <hr className='admin__separator' />
            <h3>Add New Profession</h3>
            {openElement === 'ProfessionCreator' && (
              <ProfessionCreator
                setNewProfessionData={setNewProfessionData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('ProfessoinUpdater')}>
            <hr className='admin__separator' />
            <h3>Update Profession</h3>
            {openElement === 'ProfessoinUpdater' && (
              <ProfessoinUpdater
                setUpdatedProfessionData={setUpdatedProfessionData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('ServiceCreator')}>
            <hr className='admin__separator' />
            <h3>Add New Service</h3>
            {openElement === 'ServiceCreator' && (
              <ServiceCreator
                setNewServiceData={setNewServiceData}
                setError={setError}
              />
            )}
          </div>
          <div onClick={() => setOpenElement('ServiceUpdater')}>
            <hr className='admin__separator' />
            <h3>Update Service</h3>
            {openElement === 'ServiceUpdater' && (
              <ServiceUpdater
                setUpdatedServiceData={setUpdatedServiceData}
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
  setUpdatedServiceData: PropTypes.func,
  setError: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ProfessionManagerTool;
