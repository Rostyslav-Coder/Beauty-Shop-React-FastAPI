// ============ USER PROVIDER COMPONENT MODULE  ============ //

import { createContext, useState, } from "react";
import PropTypes from 'prop-types';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
	const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);

	return (
		<UserContext.Provider value={{ userRole, setUserRole, userEmail, setUserEmail }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
