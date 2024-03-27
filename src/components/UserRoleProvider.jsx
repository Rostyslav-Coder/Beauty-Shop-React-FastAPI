// ============ USER ROLE PROVIDER COMPONENT MODULE  ============ //

import { useState, useTransition } from 'react';
import { UserRoleContaxt } from './UserRoleContex';
import PropTypes from 'prop-types';


const UserRoleProvider = ({ children }) => {
	const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
	const [isPending, startUserRoleTransition] = useTransition();

	const setUserRoleWithTransition = (newUserRole) => {
		startUserRoleTransition(() => {
			setUserRole(newUserRole);
		})
	};

	return (
		<UserRoleContaxt.Provider
			value={{ userRole, setUserRole: setUserRoleWithTransition, isPending }}
		>
			{children}
		</UserRoleContaxt.Provider>
	);
};

UserRoleProvider.propTypes = {
	children: PropTypes.node,
};

export default UserRoleProvider;
