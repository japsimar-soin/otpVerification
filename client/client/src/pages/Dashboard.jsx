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

	return (<>
	<section>
		
		<ToastContainer />
	</section>
</>);
};

export default Dashboard;
