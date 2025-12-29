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
				const tl = gsap.timeline();
				tl.to(".loader", {
					height: "10%",
					ease: "power2.out",
				});
				tl.to(".loader", {
					width: "0px",
					duration: 0.35,
				});
				tl.to(".loader", {
					display: "none",
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
