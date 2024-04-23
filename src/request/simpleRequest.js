// ============ SIMPLE-REQUEST FUNCTION MODULE  ============ //

import axios from 'axios';


async function sendSimpleRequest(url, data = null) {
	const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
	let dataUrl = url + '?' + new URLSearchParams(data).toString();

	try {
		const response = await axios({
			method: 'get',
			url: BASE_URL + dataUrl,
		});
		return { result: response.data.result };
	} catch (error) {
		return { error: error };
	}
}

export default sendSimpleRequest;
