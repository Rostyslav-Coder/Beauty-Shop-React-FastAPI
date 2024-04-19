// ============ HEADER COMPONENT MODULE  ============ //

import { useState } from 'react';
import { useUserContext } from './hooks/useUserContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Header.css';


const NavButton = ({ toggleMobileNavigation, isOpen }) => {
	return (
		<div
			className='navigator__toggler'
			onClick={toggleMobileNavigation}
			style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
		>+</div>
	)
};

NavButton.propTypes = {
	toggleMobileNavigation: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};


const Navigator = ({ adaptNavigationForMobile }) => {
	const { userRole, setUserRole, setUserEmail } = useUserContext();

	const logout = () => {
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('userRole');
		window.localStorage.removeItem('userEmail');
		setUserRole(null);
		setUserEmail(null);
	}

	return (
		<nav className='header__navBar'>
			<Link
				to={'/'}
				className='header__navButton'
				onClick={() => adaptNavigationForMobile()}
			>
				Home
			</Link>
			<Link
				to={'/about'}
				className='header__navButton'
				onClick={() => adaptNavigationForMobile()}
			>
				About
			</Link>
			<Link
				to={'/services'}
				className='header__navButton'
				onClick={() => adaptNavigationForMobile()}
			>
				Services
			</Link>
			<Link
				to={'/employees'}
				className='header__navButton'
				onClick={() => adaptNavigationForMobile()}
			>
				Employees
			</Link>
			<Link
				to={'/contact'}
				className='header__navButton'
				onClick={() => adaptNavigationForMobile()}
			>
				Contact
			</Link>
			{userRole === null && (
				<>
					<Link
						to={'/registration'}
						className='header__navButton'
						onClick={() => adaptNavigationForMobile()}
					>
						Sign Up
					</Link>
					<Link
						to={'/authentication'}
						className='header__navButton'
						onClick={() => adaptNavigationForMobile()}
					>
						Login
					</Link>
				</>
			)}
			{userRole === 'USER' && (
				<Link
					to={'/orders'}
					className='header__navButton'
					onClick={() => adaptNavigationForMobile()}
				>
					Orders
				</Link>
			)}
			{userRole === 'EMPLOYEE' && (
				<Link
					to={'/employee'}
					className='header__navButton'
					onClick={() => adaptNavigationForMobile()}
				>
					Dashboard
				</Link>
			)}
			{userRole === 'ADMIN' && (
				<Link
					to={'/admin'}
					className='header__navButton'
					onClick={() => adaptNavigationForMobile()}
				>
					Dashboard
				</Link>
			)}
			{userRole !== null && (
				<button
					className='header__navButton'
					onClick={() => { logout(); adaptNavigationForMobile() }}
				>
					Logout
				</button>
			)}
		</nav>
	);
};

Navigator.propTypes = {
	adaptNavigationForMobile: PropTypes.func,
};


const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMobileNavigation = () => {
		setIsOpen(!isOpen);
	};

	const adaptNavigationForMobile = () => {
		if (!window.matchMedia('(min-width: 1024px)').matches) {
			setIsOpen(false);
		}
	};

	return (
		<>
			<NavButton toggleMobileNavigation={toggleMobileNavigation} isOpen={isOpen} />
			<header className={`header ${isOpen ? 'open' : 'closed'}`}>
				<div className='header__wrapper'>
					<Navigator
						adaptNavigationForScreenSize={adaptNavigationForMobile}
					/>
				</div>
			</header>
		</>
	);
};

export default Header;
