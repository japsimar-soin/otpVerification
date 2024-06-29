/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { csv } from "csvtojson";
import { parse } from "papaparse";
import "../styles/mix.css";

const DashboardRecruiter = () => {
	const navigate = useNavigate();

	const userValid = () => {
		let token = localStorage.getItem("userdbtoken");
		if (token) {
			console.log("User is valid");
		} else {
			navigate("*");
		}
	};

	React.useEffect(() => {
		userValid();
	});

	return (
		<>
			<section>
				<div className="form_data">
					<div className="form_heading">
						<h1>Recruiter Dashboard</h1>
						<p style={{ textAlign: "center" }}>
							You can view the details here.
						</p>
					</div>
					<form>
						<div className="form_input_dash">
							<label>View details </label>
							<button type="button" className="small-btn">
								{" "}
								View{" "}
							</button>
							<div className="dropdown-container">
								<div className="form_input">
									<label htmlFor="category1">Job Profile</label>
									<select id="category1">
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
									</select>
								</div>
								<div className="form_input">
									<label htmlFor="category2">Branch</label>
									<select id="category2">
										<option value="option1">IT</option>
										<option value="option2">CSE</option>
										<option value="option3">ECE</option>
									</select>
								</div>
								<div className="form_input">
									<label htmlFor="category3">Category</label>
									<select id="category3">
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
									</select>
								</div>
							</div>
						</div>
					</form>
				</div>
				<ToastContainer></ToastContainer>
			</section>
		</>
	);
};

export default DashboardRecruiter;
