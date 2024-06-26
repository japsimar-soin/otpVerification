import axios from "axios";

export const commonrequest = async (methods, url, body, headers) => {
	try {
		let config = {
			method: methods,
			url: url,
			headers: headers
				? { ...{ "Content-Type": "application/json" }, ...headers }
				: { "Content-Type": "application/json" },
			data: body,
		};
		const response = await axios(config);
		return response;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data.error || 'Internal server error');
			// console.error("Error response data:", error.response.data);
			// console.error("Error response status:", error.response.status);
		} else if (error.request) {
            throw new Error('No response received from the server');
        } else {
            throw new Error('Error in setting up the request: ' + error.message);
        }
	}
};
