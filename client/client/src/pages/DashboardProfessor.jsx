/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { csv } from "csvtojson";
import { parse } from "papaparse";

const DashboardProfessor = () => {
	const navigate = useNavigate();
	const [file, setFile] = React.useState(null);

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
				<h2>Dashboard</h2>
				<div>
					<input type="file" onChange={handleFileChange} />
					<button onClick={handleUpload}>Upload File</button>
				</div>
				<ToastContainer></ToastContainer>
			</section>
		</>
	);
};

export default DashboardProfessor;
