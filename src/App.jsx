import Home from "./Pages/Home";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import { LoadingProvider } from "./contexts/LoadingContext";
import Header from "./Components/Header";

function App() {
	return (
		<LoadingProvider>
			{/* Fixed elements outside smooth scroll */}
			<Loader />
			<Header />
			{/* ScrollSmoother wrapper struscture */}
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</div>
		</LoadingProvider>
	);
}

export default App;
