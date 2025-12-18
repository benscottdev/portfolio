import React, { useEffect, useState } from "react";
import gsap from "gsap";

const LOADING_TIME = 3000;

function Loader({ onComplete }) {
	const [progress, setProgress] = useState(null);

	useEffect(() => {
		const start = Date.now();

		const interval = setInterval(() => {
			const elapsed = Date.now() - start;
			const percent = Math.min(Math.round((elapsed / LOADING_TIME) * 100), 100);

			setProgress(percent);

			if (percent === 100) {
				gsap.to(".loader", {
					borderRadius: 5,
					width: "0px",
					height: "0px",
					delay: 0.3,
					duration: 0.5,
				});

				document.querySelector(".percent").innerHTML = ":)";

				clearInterval(interval);
				onComplete?.();
			}
		}, 30);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="loader">
			<div className="loaderInner">
				<div className="percent">{progress}%</div>

				{progress < 100 && (
					<div className="bar">
						<div className="barFill" style={{ width: `${progress}%` }} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Loader;
