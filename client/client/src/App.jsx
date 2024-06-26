// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardProfessor from "./pages/dashboardProfessor";
import DashboardRecruiter from "./pages/DashboardRecruiter";
import DashboardStudent from "./pages/DashboardStudent";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Error from "./pages/Error";
import Headers from "./components/Headers";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Headers></Headers>
			<Routes>
				<Route path="/" element={<Login></Login>}></Route>
				<Route path="/register" element={<Register></Register>}></Route>
				<Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
				<Route path="/dashboardProfessor" element={<DashboardProfessor></DashboardProfessor>}></Route>
				<Route path="/dashboardStudent" element={<DashboardStudent></DashboardStudent>}></Route>
				<Route path="/dashboardRecruiter" element={<DashboardRecruiter></DashboardRecruiter>}></Route>
				<Route path="/user/otp" element={<Otp></Otp>}></Route>
				<Route path="*" element={<Error></Error>}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
