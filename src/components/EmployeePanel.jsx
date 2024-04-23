// ============ EMPLOYEE PAGE COMPONENT MODULE  ============ //

import { useEffect, useState } from 'react';
import { useUserContext } from './hooks/useUserContext';

import sendRequest from '../request/request';
import OfferManagerTool from './employee/employee-tools/OfferManagerTool';
import BookingManagerTool from './employee/employee-tools/BookingManagerTool';
import OfferManagerDesktop from './employee/employee-desktop/OfferManagerDesktop';
import BookingManagerDesktop from './employee/employee-desktop/BookingManagerDesktop';
import '../styles/Employee.css';


const EmployeePanel = () => {
  const [newOffer, setNewOffer] = useState(null);
  const [error, setError] = useState(null);
  const [openComponent, setOpenComponent] = useState('');
  const [myData, setMyData] = useState(() => {
    const myLoalData = localStorage.getItem('employee');
    return myLoalData ? JSON.parse(myLoalData) : null;
  });
  const { userEmail } = useUserContext();

  useEffect(() => {
    if (!myData) {
      const REQUEST_URL = '/employees/me';

      const fetchData = async () => {
        try {
          const result = await sendRequest('get', REQUEST_URL);
          if (result.error) {
            setError(result.error);
          } else {
            localStorage.setItem('employee', JSON.stringify(result.result));
            setMyData(result.result);
            setError(null);
          }
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    }
  }, [myData]);

  const handleOpen = (ComponentName) => {
    setOpenComponent(ComponentName);
  };

  return (
    <section className='employee'>
      <h1 className='employee__title'>Hi {userEmail}</h1>
      <div className='employee__wrapper'>
        <div className='employeeTools'>
          <OfferManagerTool
            setNewOffer={setNewOffer}
            myData={myData}
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
