import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userVerify } from "../services/Apis";

const Otp = () => {
	const [otp, setOtp] = React.useState("");
	const location = useLocation();
	const navigate = useNavigate();

	const LoginUser = async (e) => {
		e.preventDefault();
		if (otp === "") {
			toast.error("Enter your OTP");
		} else if (!/[^a-zA-Z]/.test(otp)) {
			toast.error("Enter valid OTP");
		} else if (otp.length !== 6) {
			toast.error("OTP must be of 6 digits");
		} else {
			const data = {
				otp,
				email: location.state,
			};
			const response = await userVerify(data);
			if (response && response.status === 200) {
				localStorage.setItem("userdbtoken", response.data.userToken);
				toast.success(response.data.message);
				setTimeout(() => {
					navigate("/dashboard");
				}, 3000);
			} else {
				toast.error(
					(response && response.data && response.data.error) ||
						"OTP verification failed"
				);
			}
		}
	};
	return (
		<>
			<section>
				<div className="form_data">
					<div className="form_heading">
						<h1>Please enter your OTP here</h1>
					</div>
					<form action="">
						<div className="form_input">
							<label htmlFor="otp">OTP</label>
							<input
								type="text"
								name="otp"
								placeholder="OTP"
								onChange={(e) => {
									setOtp(e.target.value);
								}}
							/>
						</div>
						<button className="btn" onClick={LoginUser}>
							{" "}
							Submit{" "}
						</button>
					</form>
				</div>
				<ToastContainer></ToastContainer>
			</section>
		</>
	);
};

export default Otp;
