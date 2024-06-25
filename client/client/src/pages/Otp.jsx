import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userVerify } from "../services/Apis";

const Otp = () => {
	const [otp, setOtp] = React.useState("");
	const location = useLocation();
	const navigate = useNavigate();

	const verifyOtp = async (e) => {
		e.preventDefault();
		console.log("Location state:", location.state);
		console.log("OTP:", otp);
		if (otp === "" || otp.length !== 6) {
			toast.error("Enter valid OTP");
			return;
		}
		if (!location.state || !location.state.email) {
			toast.error("Email not found. Please try again.");
			return;
		}
		try {
			const response = await userVerify({
				email: location.state.email,
				otp: otp,
			});

			if (response.status === 200) {
				localStorage.setItem("userdbtoken", response.data.userToken);
				toast.success(response.data.message);
				navigate("/dashboard");
			} else {
				toast.error(response.data.error || "OTP verification failed");
			}
		} catch (error) {
			console.error("Error during OTP verification:", error);
			toast.error("An error occurred, please try again");
		}
	};

	return (
		<>
			<section>
				<div className="form_data">
					<div className="form_heading">
						<h1>Verify OTP</h1>
						<p style={{ textAlign: "center" }}>
							We have sent you an OTP code to your email.
						</p>{" "}
					</div>
					<form onSubmit={verifyOtp} action="">
						<div className="form_input">
							<label htmlFor="otp">OTP</label>
							<input
								type="text"
								name="otp"
								placeholder="OTP"
								value={otp}
								onChange={(e) => {
									setOtp(e.target.value);
								}}
							/>
						</div>
						<button className="btn" type="submit">
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
