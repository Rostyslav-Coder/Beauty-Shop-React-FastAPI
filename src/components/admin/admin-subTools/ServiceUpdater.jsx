// ============ SERVICE-UPDATER COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import ServiceSelect from '../../official/ServiceSelect';
import sendRequest from '../../../request/request';


// ! Validated Component
const ServiceUpdater = ({ setUpdatedServiceData, setError }) => {
  const [updatedKay, setUpdatedKay] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');
  const [updatedServiceId, setUpdatedServiceId] = useState('');

  const handleUpdateKeyChange = (e) => {
    setUpdatedKay(e.target.value);
  };

  const handleUpdateValueChange = (e) => {
    setUpdatedValue(e.target.value);
  };

  const resetData = () => {
    setUpdatedKay('');
    setUpdatedValue('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const REQUEST_URL = '/services/update';
    const data = {
      service_id: updatedServiceId,
      payload_kay: updatedKay,
      payload_value: (
        updatedKay === 'name' ? updatedValue.toUpperCase() : updatedValue
      ),
    };

    try {
      const result = await sendRequest('put', REQUEST_URL, data);
      if (result.error) {
        setError(result.error);
      } else {
        setUpdatedServiceData(result.result);
        resetData();
        setError(null);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className='subComponent'>
      <form onSubmit={handleSubmit}>
        <ServiceSelect setService={setUpdatedServiceId} />
        <label htmlFor='key'>
          What`s change:
          <select id='key' onChange={handleUpdateKeyChange} required>
            <option value={''}>Select One</option>
            <option value='name'>Service Name</option>
            <option value='description'>Service Description</option>
            <option value='min_price'>Service Minimal Price</option>
          </select>
        </label>
        <label htmlFor='value'>
          Add New:
          <input
            id='value'
            type='text'
            value={updatedValue}
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
