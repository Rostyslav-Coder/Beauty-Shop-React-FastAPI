// ============ UseUserRole FUNCTION MODULE  ============ //

import { useContext } from 'react';
import { UserRoleContext } from './UserRoleContext';


export const useUserRole = () => {
	return useContext(UserRoleContext);
};