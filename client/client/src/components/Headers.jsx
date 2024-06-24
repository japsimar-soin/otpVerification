// import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Headers = () => {
	return (
		<>
			<Navbar bg="dark" data-bs-theme="dark">
				<Container>
					{/* <Navbar.Brand href="#home">AlumChain</Navbar.Brand> */}
					<NavLink to="/" className="mt-3 mx-1 text-light text-xxl text-decoration-none">AlumChain</NavLink>

					<Nav className="">
						<NavLink to="/register" className="mt-1 mx-2 text-light text-decoration-none">Register</NavLink>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Headers;
