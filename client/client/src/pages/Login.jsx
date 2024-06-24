import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sendOtpFunction } from "../services/Apis";
import Spinner from "react-bootstrap/Spinner";

import "../styles/mix.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [spinner, setSpinner] = useState(false);
	const navigate = useNavigate();

	const sendOtp = async (e) => {
		e.preventDefault();
		if (email === "") {
			toast.error("Enter your email");
		} else if (!email.includes("@")) {
			toast.error("Enter valid email");
		} else {
			setSpinner(true)
			const data = { email: email };
			const response = await sendOtpFunction(data);
			if (response.status === 200) {
				setSpinner(false);
				navigate("/user/otp", { state: email });
			} else {
				toast.error(
					(response && response.data && response.data.error) || "Login failed"
				);
			}
			console.log(response);
		}
	};
	return (
		<>
			<section>
				<div className="form_data">
					<div className="form_heading">
						<h1>Log In</h1>
						<p>Welcome back, please login here.</p>
					</div>
					<form action="">
						<div className="form_input">
							<label htmlFor="email">Email </label>
							<input
								type="email"
								name="email"
								placeholder="email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<button className="btn" onClick={sendOtp}>
							Login  
							{spinner ? (
								<span>
									<Spinner animation="border" role="status"></Spinner>
								</span>
							) : (
								""
							)}
						</button>
						<p>
							Don&apos;t have an account?{" "}
							<NavLink to="register">Sign up</NavLink>
						</p>
					</form>
				</div>
				<ToastContainer />
			</section>
		</>
	);
};

export default Login;
