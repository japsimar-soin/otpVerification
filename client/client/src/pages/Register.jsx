import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction, sendOtpFunction } from "../services/Apis.js";

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
		// const { name, value } = e.target;
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
        try {
            const response = await registerfunction(form);
            if (response.status === 200) {
                toast.success(response.data.message);
                await sendOtpFunction({ email: form.email });
                navigate("/user/otp", { state: {email: form.email} });
            } else {
                toast.error(response.data.error ||"Registration failed");
            }

        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed");
        }
    };

	// const sendOtp = async (e) => {
	// 	e.preventDefault();
	// 	const { fname, email, password } = form;
	// 	if (fname === "") {
	// 		toast.error("Enter your name");
	// 	} else if (email === "") {
	// 		toast.error("Enter your email");
	// 	} else if (!email.includes("@")) {
	// 		toast.error("Enter valid email");
	// 	} else if (password === "" || password.length < 6) {
	// 		toast.error("Enter valid password (minimum 6 characters");
	// 	} else {
	// 		const data = { fname, email, password };
	// 		const response = await sendOtpFunction(data);
	// 		if (response.status === 200) {
	// 			navigate("/user/otp", { state: { email, fname, password } });
	// 		} else {
	// 			toast.error(
	// 				(response && response.data && response.data.error) || "Registration failed"
	// 			);
	// 		}
	// 	}
	// };
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const { fname, email, password } = inputdata;
	// 	try {
	// 		if (fname === "") {
	// 			toast.error("Enter your name");
	// 			return;
	// 		} else if (email === "") {
	// 			toast.error("Enter your email");
	// 			return;
	// 		} else if (!email.includes("@")) {
	// 			toast.error("Enter valid email");
	// 			return;
	// 		} else if (password === "" || password.length < 6) {
	// 			toast.error("Enter valid password (minimum 6 characters");
	// 			return;
	// 		}
	// 		const response = await registerfunction(inputdata);
	// 		if (response && response.status === 200) {
	// 			setInputdata({ fname: "", email: "", password: "" });
	// 			navigate("/user/otp", {state: email});
	// 			toast.success("User registered successfully");
	// 		} else {
	// 			toast.error(response && response.data && response.data.error || "Registration failed");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error during registration:", error);
	// 		toast.error("An error occurred, please try again");
	// 	}
	// };

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
