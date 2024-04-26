// ============ APP COMPONENT MODULE  ============ //

import { ParallaxProvider } from 'react-scroll-parallax';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import About from './About';
import AdminPanel from './AdminPanel';
import Authentication from './Authentication';
import Contact from './Contact';
import EmployeePanel from './EmployeePanel';
import Employees from './Employees';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Orders from './Orders';
import Registration from './Registration';
import Services from './Services';
import { useUserContext } from './hooks/useUserContext';
import '../styles/App.css';


const App = () => {
	const { userRole } = useUserContext();

	return (
		<Router>
			<div className='application' id='aplication'>
				<Header />
				<ParallaxProvider className='aplication__wrapper'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/services/*' element={<Services />} />
						<Route path='/employees' element={<Employees />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/registration' element={<Registration />} />
						<Route path='/authentication' element={<Authentication />} />
						<Route
							path='/orders'
							element={
								userRole === 'USER' ?
									<Orders /> :
									<Navigate to={'/authentication'} replace />
							}
						/>
						<Route
							path='/employee'
							element={
								userRole === 'EMPLOYEE' ?
									<EmployeePanel /> :
									<Navigate to={'/authentication'} replace />
							}
						/>
						<Route
							path='/admin'
							element={
								userRole === 'ADMIN' ?
									<AdminPanel /> :
									<Navigate to={'/authentication'} replace />
							}
						/>
					</Routes>
				</ParallaxProvider>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
