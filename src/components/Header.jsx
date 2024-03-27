// ============ HEADER COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import UserRoleProvider from './UserRoleProvider';

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
	const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
	const [token, setToken] = useState(localStorage.getItem('token'));

	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
	}, []);

	useEffect(() => {
		if (!token) {
			setUserRole('GUEST');
			return;
		}

		if (token) {
			axios.get('http://127.0.0.1:8000/users/role', {
				headers: { Authorization: `Bearer ${token}` }
			})
				.then(response => {
					setUserRole(response.data.role);
					localStorage.setItem('userRole', response.data.role);
					console.log(userRole)
				})
				.catch(error => {
					console.error('Error when getting user role:', error);
					if (error.response && error.response.status === 401) {
						localStorage.removeItem('token');
						localStorage.removeItem('userRole');
						setUserRole('GUEST');
					}
					setUserRole('GUEST');
				});
		}
	}, [token, userRole]);

	const logout = () => {
		window.localStorage.removeItem('token');
		setToken(null);
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('userRole');
		setUserRole('GUEST');
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
			{userRole === 'GUEST' && (
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
			{userRole !== 'GUEST' && (
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
					<UserRoleProvider>
						<Navigator
							adaptNavigationForScreenSize={adaptNavigationForMobile}
						/>
					</UserRoleProvider>
				</div>
			</header>
		</>
	);
};

export default Header;
