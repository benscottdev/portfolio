import { useRef, useEffect } from "react";
import Header from "../Components/Header";
import Orb from "../Components/Orb";
import SydneyTime from "../Components/SydneyTime";
import ProjectsBlock from "../Components/ProjectsBlock";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../Components/Loader";
import RadarChart from "../Components/RadarChart";

gsap.registerPlugin(ScrollTrigger);

function Home() {
	const fillRef = useRef(null);
	const strokeRef = useRef(null);

	const copyWrapperRef = useRef(null);
	const copyWrapperTopRef = useRef(null);
	const copyWrapperBottomRef = useRef(null);

	useEffect(() => {
		const fillEl = fillRef.current;
		const strokeEl = strokeRef.current;

		const copyWrapper = copyWrapperRef.current;
		const copyWrapperTop = copyWrapperTopRef.current;
		const copyWrapperBottom = copyWrapperBottomRef.current;

		if (!fillEl) return;
		if (!strokeEl) return;
		if (!copyWrapper) return;
		if (!copyWrapperTop) return;
		if (!copyWrapperBottom) return;

		gsap.to([fillEl, strokeEl], {
			opacity: 0,
			ease: "power2.out",
			scrollTrigger: {
				trigger: fillEl,
				start: "top top",
				end: "bottom bottom",
				scrub: 2,
			},
		});

		gsap.fromTo(
			copyWrapperTop,
			{ opacity: 0, scale: 0 },
			{
				opacity: 1,
				scale: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: copyWrapper,
					start: "top 30%",
					end: "bottom bottom",
					scrub: 1,
				},
			}
		);

		gsap.fromTo(
			copyWrapperBottom,
			{ opacity: 0, scale: 4 },
			{
				opacity: 1,
				scale: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: copyWrapper,
					start: "top 30%",
					end: "bottom bottom",
					scrub: 1,
				},
			}
		);
	}, []);

	return (
		<div>
			<Loader />
			<div className="homeMain headerAdjustment">
				<div className="logoOverlay">
					<div className="overlayStroke">
						<span ref={fillRef} className="fill">
							BEN SCOTT
						</span>
					</div>
					<div className="overlayFill">
						<span ref={strokeRef} className="stroke">
							BEN SCOTT
						</span>
					</div>
				</div>

				<div className="copyWrapper" ref={copyWrapperRef}>
					<div className="copy leftSide" ref={copyWrapperTopRef}>
						<p>[ I'M A 25 YEAR OLD, SYDNEY BASED DIGITAL CREATOR ]</p>
					</div>
					<div className="copy rightSide" ref={copyWrapperBottomRef}>
						<p>[ I LOVE TO MAKE COOL SHIT ]</p>
					</div>
				</div>

				<div className="overtop">
					<div className="selectedProjects">
						<h1>[ SELECTED ]</h1>
						<ProjectsBlock />
					</div>

					{/* <div className="skillLevels">
						<h1>[ ABILITY ]</h1>
						<RadarChart />
					</div> */}
				</div>
			</div>
			<SydneyTime />
			<Orb />
			<Header />
		</div>
	);
}

export default Home;
