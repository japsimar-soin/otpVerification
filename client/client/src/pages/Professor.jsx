/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { csv } from "csvtojson";
import { parse } from "papaparse";
import "../styles/mix.css";

const Professor = () => {
	const navigate = useNavigate();
	const [file, setFile] = React.useState(null);
	const [selectedOption, setSelectedOption] = React.useState("");

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const handleUpload = async () => {
		if (file) {
			const fileContent = await parseCSV(file);
			console.log("Parsed JSON:", fileContent);

			// Example: send fileContent to backend for further processing
			// uploadFileToBackend(fileContent);
		} else {
			toast.error("Please select a file to upload");
		}
	};

	const parseCSV = async (file) => {
		return new Promise((resolve, reject) => {
			parse(file, {
				header: true,
				complete: (results) => {
					const jsonData = results.data;
					resolve(jsonData);
				},
				error: (error) => {
					reject(error);
				},
			});
		});
	};

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
						<h1>Professor Dashboard</h1>
						<p style={{ textAlign: "center" }}>
							You can view, edit, or upload the details here.
						</p>
					</div>
					<form>
						<div className="form_input_dash">
							<label>Upload files </label>
							<button
								type="button"
								onClick={handleUpload}
								className="small-btn"
							>
								Upload File
							</button>
							<input type="file" onChange={handleFileChange} />
						</div>
						<div className="form_input_dash">
							<label>View details </label>
							<button type="button" className="small-btn">
								{" "}
								View{" "}
							</button>
							<div className="custom-select-box">
								<select
									id="selectOption"
									value={selectedOption}
									onChange={(e) => setSelectedOption(e.target.value)}
								>
									<option value="" disabled>
										Select an option
									</option>
									<option value="option1">IT</option>
									<option value="option2">CSE</option>
									<option value="option3">ECE</option>
								</select>
								{selectedOption && (
									<span className="selected-text">{selectedOption}</span>
								)}
							</div>
						</div>
						<div className="form_input_dash">
							<label>Edit details </label>
							<button type="button" className="small-btn">
								{" "}
								Edit{" "}
							</button>
							<input type="text" onChange={handleFileChange} />
						</div>
					</form>
				</div>
				<ToastContainer></ToastContainer>
			</section>
		</>
	);
};

export default Professor;
