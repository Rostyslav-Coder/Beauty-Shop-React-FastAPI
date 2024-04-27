// ============ REQUEST FUNCTION MODULE  ============ //

import axios from 'axios';


async function sendRequest(method, url, data = null, onUnauthorized = null) {
	const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
	let token = localStorage.getItem('token');

	if (!token) {
		onUnauthorized();
		return;
	}

	let headers = {
		'Authorization': `Bearer ${token}`,
	};

	// Adding the 'Content-Type' header only for POST requests
	if (method === 'post') {
		headers['Content-Type'] = 'application/json';
	}

	// If this is a GET request and there is data, add it to the URL as request parameters
	if (method === 'get' && data) {
		url += '?' + new URLSearchParams(data).toString();
	}

	// If this is a PUT request and there is data, add it to the URL as request parameters
	if (method === 'put' && data) {
		url += '?' + new URLSearchParams(data).toString();
	}

	try {
		const response = await axios({
			method: method,
			url: BASE_URL + url,
			data: data,
			headers: headers,
		});
		return { result: response.data.result };
	} catch (error) {
		if (error.response && error.response.status === 401) {
			// If the response is 401, update the token and repeat the request
			const refreshResponse = await axios.post(BASE_URL + '/refresh', {}, { headers: headers });
			if (refreshResponse.status === 200) {
				// If the token update was successful, save the new token and retry the request
				token = refreshResponse.data.access_token;
				localStorage.setItem('token', token);
				headers['Authorization'] = `Bearer ${token}`;
				const retryResponse = await axios({
					method: method,
					url: BASE_URL + url,
					data: data,
					headers: headers,
				});
				return { result: retryResponse.data.result };
			} else {
				// If the token refresh fails, call the unauthorized access handler
				if (onUnauthorized) {
					onUnauthorized();
				}
				throw new Error('Unauthorized request');
			}
		} else {
			// Handle other errors
			return { error: 'An error occurred while executing the request.' };
		}
	}
}

export default sendRequest;
