// ============ APP COMPONENT MODULE  ============ //

import { useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Header from './Header';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';
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
			case 'Contact':
				return <Contact />;
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
