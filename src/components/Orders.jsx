// ============ ORDERS PAGE COMPONENT MODULE  ============ //

import { useUserContext } from './hooks/useUserContext';
import '../styles/Orders.css';


const Orders = () => {
	const { userEmail } = useUserContext();

	return <div className='order'>Hi {userEmail}</div>
};

export default Orders;
