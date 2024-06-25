import { commonrequest } from "./ApiCall.js";
import { BACKEND_URL } from "./helper.js";

export const registerfunction = async (data) => {
	return await commonrequest("POST", `${BACKEND_URL}/user/register`, data);
};

export const sendOtpFunction = async(data) => {
	return await commonrequest("POST", `${BACKEND_URL}/user/sendotp`, data);
}

export const userVerify = async(data) => {
	return await commonrequest("POST", `${BACKEND_URL}/user/verifyotp`, data);
}

export const loginUserFunction = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/login`, data);
};