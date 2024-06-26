import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOtpFunction, userVerifyFunction } from "../services/Apis";
import { getUserTypeFunction } from "../services/helper.js";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

const Otp = () => {
	const [otp, setOtp] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [spinner, setSpinner] = React.useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		const emailFromState = location.state?.email;
		if (emailFromState) {
			setEmail(emailFromState);
			sendOtp(emailFromState);
		} else {
			toast.error("Email not found. Please try again.");
			navigate("/login");
		}
	}, [location.state, navigate]);

	const sendOtp = async (email) => {
		setSpinner(true);
		try {
			const response = await sendOtpFunction({ email });
			if (response.status === 200) {
				toast.success("OTP sent successfully");
			} else {
				toast.error(response.data.error || "Failed to send OTP");
			}
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to send OTP");
		} finally {
			setSpinner(false);
		}
	};

	const verifyOtp = async (e) => {
		e.preventDefault();
		console.log("Location state:", location.state);
		console.log("OTP:", otp);
		if (otp === "" || otp.length !== 6) {
			toast.error("Enter valid OTP");
			return;
		}
		// if (!location.state || !location.state.email) {
		// 	toast.error("Email not found. Please try again.");
		// 	return;
		// }
		try {
			const response = await userVerifyFunction({
				email, otp
			});
			const userType = getUserTypeFunction(email);
			if (response.status === 200) {
				localStorage.setItem("userdbtoken", response.data.userToken);
				toast.success(response.data.message);
				switch (userType) {
					case "student":
						navigate("/dashboardStudent");
						break;
					case "professor":
						navigate("/dashboardProfessor");
						break;
					case "recruiter":
						navigate("/dashboardRecruiter");
						break;
					default:
						navigate("/");
						break;
				}
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
					{spinner && (
                        <div className="spinner">
                            <Spinner animation="border" role="status">
                                {/* <span className="sr-only">Loading...</span> */}
                            </Spinner>
                        </div>
                    )}
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
