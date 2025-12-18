import Home from "./Pages/Home";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import gsap from "gsap";
import { useEffect } from "react";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
