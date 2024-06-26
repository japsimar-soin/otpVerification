import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerFunction, sendOtpFunction } from "../services/Apis.js";
import { getUserTypeFunction } from "../services/helper.js";
import "../styles/mix.css";

const Register = () => {
	const [passShow, setPassShow] = React.useState(false);
	const [form, setForm] = React.useState({
		fname: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		const { fname, email, password } = form;
		if (!fname) {
			toast.error("Enter your name");
			return;
		}
		if (!email || !email.includes("@")) {
			toast.error("Enter a valid email");
			return;
		}
		if (!password || password.length < 6) {
			toast.error("Enter a valid password (minimum 6 characters)");
			return;
		}

		const userType = getUserTypeFunction(email);
        console.log("User type:", userType);

		try {
			const response = await registerFunction(form);
			if (response.status === 200) {
				toast.success(response.data.message);
				await sendOtpFunction({ email: form.email });
				navigate("/user/otp", { state: { email: form.email } });
			} else {
				toast.error(response.data.error || "User already exists");
			}
		} catch (error) {
			toast.error(error.response?.data?.error || "Already registered. Please login");
		}
	};

	const handleVerifyLink = () => {
		const email = form.email;
		if (!email || !email.includes("@")) {
			toast.error("Enter a valid email first");
			return;
		}
		localStorage.setItem("unverifiedEmail", email);
		navigate("/user/otp", { state: { email } });
	};

	return (
		<>
			<section>
				<div className="form_data">
					<div className="form_heading">
						<h1>Sign up</h1>
						<p style={{ textAlign: "center" }}>
							Welcome, please register here.
						</p>
					</div>
					<form onSubmit={handleRegister}>
						<div className="form_input">
							<label htmlFor="fname">Name </label>
							<input
								type="text"
								name="fname"
								value={form.fname}
								onChange={handleChange}
								placeholder="Name"
							/>
						</div>
						<div className="form_input">
							<label htmlFor="email">Email </label>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="Email"
							/>
						</div>
						<div className="form_input">
							<label htmlFor="password">Password </label>
							<div className="two">
								<input
									type={!passShow ? "password" : "text"}
									name="password"
									value={form.password}
									onChange={handleChange}
									placeholder="Password"
								/>
								<div
									className="showpass"
									onClick={() => {
										setPassShow(!passShow);
									}}
								>
									{!passShow ? "Show" : "Hide"}
								</div>
							</div>
						</div>
						<button type="submit" className="btn">
							Sign up
						</button>
						<p>
							Already have an account? <NavLink to="/" style={{textDecoration: "none"}} >Login</NavLink>
						</p>
						<p>
							Account not verified? <NavLink to="/user/otp" style={{textDecoration: "none"}} onClick={handleVerifyLink} className="verify-link" >Verify</NavLink>
						</p>
					</form>
				</div>
				<ToastContainer />
			</section>
		</>
	);
};

export default Register;
