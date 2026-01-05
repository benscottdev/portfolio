import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "../contexts/LoadingContext";

function Loader() {
	const { loadingProgress, isLoaded } = useLoading();
	const [displayProgress, setDisplayProgress] = useState(0);
	const animationRef = useRef(null);

	// Smoothly animate the displayed progress
	useEffect(() => {
		const target = loadingProgress;
		const current = displayProgress;

		// Kill any existing animation
		if (animationRef.current) {
			animationRef.current.kill();
		}

		// Only animate if target is higher than current
		if (target > current) {
			const duration = target === 100 ? 500 : 1500; // Faster at 100%
			animationRef.current = gsap.to(
				{ value: current },
				{
					value: target,
					duration: duration / 1000,
					ease: "power2.out",
					onUpdate: function () {
						setDisplayProgress(Math.round(this.targets()[0].value));
					},
				}
			);
		}
	}, [loadingProgress, displayProgress]);

	useEffect(() => {
		if (isLoaded && displayProgress === 100) {
			const tl = gsap.timeline({
				onComplete: () => {
					// Refresh ScrollTrigger after loader completes
					ScrollTrigger.refresh();
				},
			});
			tl.to(".percent", {
				opacity: 0,
				duration: 0.3,
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
		}
	}, [isLoaded, displayProgress]);

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
				<div className="percent">{displayProgress}%</div>
				<div className="bar">
					<div className="barFill" style={{ height: `${displayProgress}%` }} />
				</div>
			</div>
		</div>
	);
}

export default Loader;
