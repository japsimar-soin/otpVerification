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
            // Call userVerify API with email and otp
            const response = await userVerify({
                email: location.state.email,
                otp: otp
            });

            // Handle response
            if (response.status === 200) {
                // Successfully verified OTP
                localStorage.setItem("userdbtoken", response.data.userToken);
                toast.success(response.data.message);
                navigate("/dashboard"); // Redirect to dashboard or home page
            } else {
                // Handle server-side errors or invalid OTP
                toast.error(response.data.error || "OTP verification failed");
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error("Error during OTP verification:", error);
            toast.error("An error occurred, please try again");
        }
		// else {
		// 	const response = await userVerify({
		// 		email: location.state.email,
		// 		otp: otp,
		// 		fname: location.state.fname,
		// 		password: location.state.password,
		// 	});

		// 	if (response.status === 200) {
		// 		navigate("/");
		// 		toast.success("User registered successfully");
		// 	} else {
		// 		toast.error(
		// 			(response && response.data && response.data.error) ||
		// 				"OTP verification failed"
		// 		);
		// 	}
		// }
	};
	// const LoginUser = async (e) => {
	// 	e.preventDefault();
	// 	if (otp === "") {
	// 		toast.error("Enter your OTP");
	// 	} else if (!/[^a-zA-Z]/.test(otp)) {
	// 		toast.error("Enter valid OTP");
	// 	} else if (otp.length !== 6) {
	// 		toast.error("OTP must be of 6 digits");
	// 	} else {
	// 		const data = {
	// 			otp,
	// 			email: location.state,
	// 		};
	// 		const response = await userVerify(data);
	// 		if (response && response.status === 200) {
	// 			localStorage.setItem("userdbtoken", response.data.userToken);
	// 			toast.success(response.data.message);
	// 			setTimeout(() => {
	// 				navigate("/dashboard");
	// 			}, 3000);
	// 		} else {
	// 			toast.error(
	// 				(response && response.data && response.data.error) ||
	// 					"OTP verification failed"
	// 			);
	// 		}
	// 	}
	// };
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
