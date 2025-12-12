import Home from "./Pages/Home";
import "./style.css";
import { Route, Routes } from "react-router-dom";

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
