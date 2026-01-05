import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used within LoadingProvider");
	}
	return context;
};

export const LoadingProvider = ({ children }) => {
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	return <LoadingContext.Provider value={{ loadingProgress, setLoadingProgress, isLoaded, setIsLoaded }}>{children}</LoadingContext.Provider>;
};
