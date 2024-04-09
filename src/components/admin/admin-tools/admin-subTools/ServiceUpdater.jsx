// ============ SERVICE-UPDATER COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ServiceSelect from '../../../official/ServiceSelect';
import sendRequest from '../../../../request/request';


const ServiceUpdater = ({ setUpdatedServiceData, setError }) => {
  const [updatKay, setUpdatKay] = useState('');
  const [updatValue, setUpdatValue] = useState('');
  const [updatedServiceId, setUpdatedServiceId] = useState('');

  const handleUpdateKeyChange = (e) => {
    setUpdatKay(e.target.value);
  };

  const handleUpdateValueChange = (e) => {
    setUpdatValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const REQUEST_URL = '/services/update';
    const data = {
      service_id: updatedServiceId,
      service_key: updatKay,
      service_value: updatValue,
    };

    try {
      const result = await sendRequest('put', REQUEST_URL, data);
      if (result.error) {
        setError(result.error)
      } else {
        setUpdatedServiceData(result.result)
        setError(null)
      }
    } catch (error) {
      setError(error)
    }
  };

  return (
    <div className='subComponent'>
      <form onSubmit={handleSubmit}>
        <ServiceSelect setService={setUpdatedServiceId} />
        <label htmlFor='key'>
          What`s change:
          <select id='key' onChange={handleUpdateKeyChange} required>
            <option value={null}>Select One</option>
            <option value='name'>Service Name</option>
            <option value='description'>Service Description</option>
          </select>
        </label>
        <label htmlFor='value'>
          Add New:
          <input
            id='value'
            type='text'
            value={updatValue}
            onChange={handleUpdateValueChange}
            required
          />
        </label>
        <button type='submit'>Update Service</button>
      </form>
    </div>
  );
};

ServiceUpdater.propTypes = {
  setUpdatedServiceData: PropTypes.func,
  setError: PropTypes.func,
};

export default ServiceUpdater;
