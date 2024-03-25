// ============ APP COMPONENT MODULE  ============ //

import { useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Header from './Header';
import Home from './Home';
import About from './About';
import Services from './Services';
import Employees from './Employees';
import Contact from './Contact';
import Registration from './Registration';
import Authentication from './Authentication';
import Orders from './Orders';
import Employee from './Employee';
import Admin from './Admin';
import Footer from './Footer';
import '../styles/App.css';


const App = () => {
	const [page, setPage] = useState('Home');

	const renderPage = () => {
		switch (page) {
			case 'Home':
				return <Home />;
			case 'About':
				return <About />;
			case 'Services':
				return <Services />;
			case 'Employees':
				return <Employees />;
			case 'Contact':
				return <Contact />;
			case 'Registration':
				return <Registration setPage={setPage} />;
			case 'Authentication':
				return <Authentication />;
			case 'Orders':
				return <Orders />;
			case 'Employee':
				return <Employee />;
			case 'Admin':
				return <Admin />;
			default:
				return <Home />;
		}
	};

	return (
		<div className='application' id='aplication'>
			<Header setPage={setPage} />
			<ParallaxProvider className='aplication__wrapper'>
				{renderPage()}
			</ParallaxProvider>
			<Footer />
		</div>
	);
};

export default App;
