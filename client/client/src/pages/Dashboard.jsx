import React from "react";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
	const userValid = () => {
		let token = localStorage.getItem("userdbtoken");
		if(token){
			console.log("User is valid");
		}
		else{
			navigate("*");
		}
	}

	React.useEffect(() => {
		userValid();
	}, []);

	return <div>Dashboard</div>;
};

export default Dashboard;
