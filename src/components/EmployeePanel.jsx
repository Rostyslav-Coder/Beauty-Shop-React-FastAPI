// ============ EMPLOYEE PAGE COMPONENT MODULE  ============ //

import { useState } from 'react';

import OfferManagerTool from './employee/employee-tools/OfferManagerTool';
import BookingManagerTool from './employee/employee-tools/BookingManagerTool';
import OfferManagerDesktop from './employee/employee-desktop/OfferManagerDesktop';
import BookingManagerDesktop from './employee/employee-desktop/BookingManagerDesktop';
import '../styles/Employee.css';


const EmployeePanel = () => {
  const [newOffer, setNewOffer] = useState(null);
  const [error, setError] = useState(null);
  const [openComponent, setOpenComponent] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const employeeName = user.firstName ? user.firstName : user.email;

  const handleOpen = (ComponentName) => {
    setOpenComponent(ComponentName);
  };

  return (
    <section className='employee'>
      <h1 className='employee__title'>Hi {employeeName}</h1>
      <div className='employee__wrapper'>
        <div className='employeeTools'>
          <OfferManagerTool
            setNewOffer={setNewOffer}
            setError={setError}
            isOpen={openComponent === 'OfferManagerTool'}
            onOpen={() => handleOpen('OfferManagerTool')}
          />
          <BookingManagerTool
            setError={setError}
            isOpen={openComponent === 'BookingManagerTool'}
            onOpen={() => handleOpen('BookingManagerTool')}
          />
        </div>
        <div className='employeeDesktop'>
          {openComponent === 'OfferManagerTool' && (
            <OfferManagerDesktop
              newOffer={newOffer}
              error={error}
            />
          )}
          {openComponent === 'BookingManagerTool' && (
            <BookingManagerDesktop
              error={error}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployeePanel;
