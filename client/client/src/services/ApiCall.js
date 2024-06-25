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
			console.error("Error response data:", error.response.data);
			console.error("Error response status:", error.response.status);
		} else {
			console.error("Error message:", error.message);
		}
		throw error;
	}
};
