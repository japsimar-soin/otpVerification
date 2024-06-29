import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginUserFunction } from "../services/Apis.js";
import { getUserTypeFunction } from "../services/helper.js";
import Spinner from "react-bootstrap/Spinner";

import "../styles/mix.css";

const Login = () => {
	const [passShow, setPassShow] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [spinner, setSpinner] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			toast.error("Enter your email and password");
		} else if (!email.includes("@")) {
			toast.error("Enter valid email");
		} else {
			setSpinner(true);
			const userType = getUserTypeFunction(email);
			console.log("User type:", userType);

			const data = { email: email, password: password, userType: userType };
			try {
				const response = await loginUserFunction(data);
				if (response.status === 200) {
					localStorage.setItem("userdbtoken", response.data.token);
					toast.success("Login successful");
					switch (response.data.userType) {
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
					toast.error(response.data.error || "Login failed");
				}
			} catch (error) {
				toast.error(error.response?.data?.error || "Login failed");
			} finally {
				setSpinner(false);
			}
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
					<form action="" onSubmit={handleLogin}>
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
						<div className="form_input">
							<label htmlFor="password">Password </label>
							<div className="two">
								<input
									type={!passShow ? "password" : "text"}
									name="passsword"
									placeholder="password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
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
						<button className="btn" type="submit">
							Login
							{spinner && (
								<span>
									<Spinner animation="border" role="status"></Spinner>
								</span>
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
