import Home from "./Pages/Home";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";

function App() {
	return (
		<div className="app">
			<Loader />

			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
