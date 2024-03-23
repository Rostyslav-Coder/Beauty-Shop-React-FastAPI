// ============ HEADER COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';


const NavButton = ({ toggleMobileNavigation, isOpen }) => {
	return (
		<div
			className='navigator__toggler'
			onClick={toggleMobileNavigation}
			style={{ transform: isOpen ? 'rotate(45deg' : 'rotate(0' }}
		>+</div>
	)
};

NavButton.propTypes = {
	toggleMobileNavigation: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

const Navigator = ({ setPage, adaptNavigationForScreenSize }) => {
	return (
		<nav className='header__navBar'>
			<button
				className='header__navButton'
				onClick={() => { setPage('Home'); adaptNavigationForScreenSize() }}
			>
				Home
			</button>
			<button
				className='header__navButton'
				onClick={() => { setPage('About'); adaptNavigationForScreenSize() }}
			>
				About
			</button>
			<button
				className='header__navButton'
				onClick={() => { setPage('Services'); adaptNavigationForScreenSize() }}
			>
				Services
			</button>
			<button
				className='header__navButton'
				onClick={() => { setPage('Contact'); adaptNavigationForScreenSize() }}
			>
				Contact
			</button>
		</nav>
	);
};

Navigator.propTypes = {
	setPage: PropTypes.func.isRequired,
	adaptNavigationForScreenSize: PropTypes.func.isRequired,
};

const Header = ({ setPage }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMobileNavigation = () => {
		setIsOpen(!isOpen);
	};

	const adaptNavigationForScreenSize = () => {
		if (!window.matchMedia('(min-width: 1024px)').matches) {
			setIsOpen(false);
		}
	};

	return (
		<>
			<NavButton toggleMobileNavigation={toggleMobileNavigation} isOpen={isOpen} />
			<header className={`header ${isOpen ? 'open' : 'closed'}`}>
				<div className='header__wrapper'>
					<Navigator setPage={setPage} adaptNavigationForScreenSize={adaptNavigationForScreenSize} />
				</div>
			</header>
		</>
	);
};

Header.propTypes = {
	setPage: PropTypes.func.isRequired,
};

export default Header;
