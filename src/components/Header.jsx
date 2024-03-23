// ============ HEADER COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import axios from 'axios';
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
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		checkUserRole().then(role => setUserRole(role));
	}, []);

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
				onClick={() => { setPage('Employees'); adaptNavigationForScreenSize() }}
			>
				Our Employees
			</button>
			<button
				className='header__navButton'
				onClick={() => { setPage('Contact'); adaptNavigationForScreenSize() }}
			>
				Contact
			</button>
			{userRole === null && (
				<>
					<button
						className='header__navButton'
						onClick={() => { setPage('Registration'); adaptNavigationForScreenSize() }}
					>
						Register
					</button>
					<button
						className='header__navButton'
						onClick={() => { setPage('Authentication'); adaptNavigationForScreenSize() }}
					>
						Login
					</button>
				</>
			)}
			{userRole === 'user' && (
				<button
					className='header__navButton'
					onClick={() => { setPage('Orders'); adaptNavigationForScreenSize() }}
				>
					My Orders
				</button>
			)}
			{userRole === 'employee' && (
				<button
					className='header__navButton'
					onClick={() => { setPage('Employee'); adaptNavigationForScreenSize() }}
				>
					Dashboard
				</button>
			)}
			{userRole === 'admin' && (
				<button
					className='header__navButton'
					onClick={() => { setPage('Admin'); adaptNavigationForScreenSize() }}
				>
					Dashboard
				</button>
			)}
			{userRole && (
				<button
					className='header__navButton'
					onClick={() => { logout(); adaptNavigationForScreenSize() }}
				>
					Logout
				</button>
			)}
		</nav>
	);
};

Navigator.propTypes = {
	setPage: PropTypes.func.isRequired,
	adaptNavigationForScreenSize: PropTypes.func.isRequired,
};

async function checkUserRole() {
	const token = window.localStorage.getItem('access_token') || window.sessionStorage.getItem('access_token');

	if (!token) {
		return null;
	}

	try {
		const response = await axios.get('/check-role', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if (response.status === 200) {
			return response.data.role;
		}
	} catch (error) {
		return false
	}

	return null
}

function logout() {
	window.localStorage.removeItem('access_token');
	window.sessionStorage.removeItem('access_token');
}

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
