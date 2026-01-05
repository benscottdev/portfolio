import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LOADING_TIME = 3000;

function Loader() {
	const [progress, setProgress] = useState(null);

	useEffect(() => {
		const start = Date.now();

		const interval = setInterval(() => {
			const elapsed = Date.now() - start;
			const percent = Math.min(Math.round((elapsed / LOADING_TIME) * 100), 100);

			setProgress(percent);

			if (percent === 100) {
				const tl = gsap.timeline({
					onComplete: () => {
						// Refresh ScrollTrigger after loader completes
						ScrollTrigger.refresh();
					},
				});
				tl.to(".percent", {
					opacity: 0,
				});

				tl.to(".loaderPixel", {
					autoAlpha: 0,
					duration: 0.2,
					ease: "power1.in",
					stagger: 0.1,
				});
				tl.to(".loader", {
					display: "none",
				});

				clearInterval(interval);
			}
		}, 30);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="loader">
			{window.innerWidth > 800 && (
				<>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
					<div className="loaderPixel"></div>
				</>
			)}

			<div className="loaderPixel"></div>
			<div className="loaderInner">
				<div className="percent">{progress}%</div>
				<div className="bar">
					<div className="barFill" style={{ height: `${progress}%` }} />
				</div>
			</div>
		</div>
	);
}

export default Loader;
