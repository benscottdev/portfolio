import Home from "./Pages/Home";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import { LoadingProvider } from "./contexts/LoadingContext";
import Header from "./Components/Header";
import CustomCursor from "./Components/CustomCursor";

function App() {
	return (
		<LoadingProvider>
			<CustomCursor />
			<Loader />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</LoadingProvider>
	);
}

export default App;
