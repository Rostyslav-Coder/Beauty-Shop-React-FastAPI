// ============ USER-EMAIL-SEARCH COMPONENT MODULE  ============ //

import { useState } from 'react';
import PropTypes from 'prop-types';

import sendRequest from '../../../request/request';

// ! Validated Component
const UserListAll = ({ setUserListAll, setError }) => {
	const [start, setStart] = useState(0);
	const [count, setCount] = useState(5);

	const fetchData = async (start, count) => {
		const REQUEST_URL = '/users/all';
		const data = { skip: start, limit: count, };

		try {
			const result = await sendRequest('get', REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
			} else {
				setUserListAll(result.result);
				setError(null);
			}
		} catch (error) {
			setError(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await fetchData(start, count);
		setStart(start + 5);
		setCount(count);
	};

	return (
		<div className='subComponent'>
			<form onSubmit={handleSubmit}>
				<button type='submit'>{start < 3 ? 'Get All Users' : 'Next'}</button>
			</form>
		</div>
	);
};

UserListAll.propTypes = {
	setUserListAll: PropTypes.func,
	setError: PropTypes.func,
};

export default UserListAll;
