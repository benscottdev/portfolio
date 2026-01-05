import Home from "./Pages/Home";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
	return (
		<LoadingProvider>
			<div className="app">
				<Loader />

				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</LoadingProvider>
	);
}

export default App;
