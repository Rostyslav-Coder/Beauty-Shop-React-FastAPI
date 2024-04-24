// ============ EMPLOYEE PAGE COMPONENT MODULE  ============ //

import { useEffect, useState } from 'react';
import { useUserContext } from './hooks/useUserContext';

import sendRequest from '../request/request';
import OfferManagerTool from './employee/employee-tools/OfferManagerTool';
import BookingManagerTool from './employee/employee-tools/BookingManagerTool';
import OfferManagerDesktop from './employee/employee-desktop/OfferManagerDesktop';
import BookingManagerDesktop from './employee/employee-desktop/BookingManagerDesktop';
import '../styles/Employee.css';


// ! Validated Component
const EmployeePanel = () => {
  const [bookings, setBookings] = useState([]);
  const [newOffer, setNewOffer] = useState(null);
  const [offers, setOffers] = useState([]);
  const [serviceInfo, setServiceInfo] = useState(null);
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
          <BookingManagerTool
            setBookings={setBookings}
            myData={myData}
            setError={setError}
            isOpen={openComponent === 'BookingManagerTool'}
            onOpen={() => handleOpen('BookingManagerTool')}
          />
          <OfferManagerTool
            setNewOffer={setNewOffer}
            setOffers={setOffers}
            setServiceInfo={setServiceInfo}
            myData={myData}
            setError={setError}
            isOpen={openComponent === 'OfferManagerTool'}
            onOpen={() => handleOpen('OfferManagerTool')}
          />
        </div>
        <div className='employeeDesktop'>
          {openComponent === 'BookingManagerTool' && (
            <BookingManagerDesktop
              bookings={bookings}
              error={error}
            />
          )}
          {openComponent === 'OfferManagerTool' && (
            <OfferManagerDesktop
              newOffer={newOffer}
              offers={offers}
              serviceInfo={serviceInfo}
              error={error}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployeePanel;
