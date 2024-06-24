import React from "react";
import { registerfunction } from "../services/Apis";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../styles/mix.css";

const Register = () => {
	const [passShow, setPassShow] = React.useState(false);
	const [inputdata, setInputdata] = React.useState({
		fname: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputdata({ ...inputdata, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { fname, email, password } = inputdata;
		try {
			if (fname === "") {
				toast.error("Enter your name");
				return;
			} else if (email === "") {
				toast.error("Enter your email");
				return;
			} else if (!email.includes("@")) {
				toast.error("Enter valid email");
				return;
			} else if (password === "" || password.length < 6) {
				toast.error("Enter valid password (minimum 6 characters");
				return;
			}
			const response = await registerfunction(inputdata);
			if (response && response.status === 200) {
				setInputdata({ fname: "", email: "", password: "" });
				navigate("/");
				toast.success("User registered successfully");
			} else {
				toast.error(response && response.data && response.data.error || "Registration failed");
			}
		} catch (error) {
			console.error("Error during registration:", error);
			toast.error("An error occurred, please try again");
		}
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
					<form>
						<div className="form_input">
							<label htmlFor="fname">Name </label>
							<input
								type="text"
								name="fname"
								onChange={handleChange}
								placeholder="Name"
							/>
						</div>
						<div className="form_input">
							<label htmlFor="email">Email </label>
							<input
								type="email"
								name="email"
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
						<button className="btn" onClick={handleSubmit}>
							Sign up
						</button>
						<p>
							Already have an account? <NavLink to="/">Login</NavLink>
						</p>
					</form>
				</div>
				<ToastContainer />
			</section>
		</>
	);
};

export default Register;
