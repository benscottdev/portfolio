import { useRef, useEffect } from "react";
import Orb from "../Components/Orb";
import ProjectsBlock from "../Components/ProjectsBlock";
import Skills from "../Components/Skills";
import Header from "../Components/Header";
import SectionHeading from "../Components/SectionHeading";
import About from "../Components/About";
import Footer from "../Components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
	const heroRef = useRef(null);
	const workRef = useRef(null);
	const stackRef = useRef(null);

	useEffect(() => {
		let ctx;

		// ScrollTrigger.matchMedia for responsive behavior
		const mm = gsap.matchMedia();

		// Small delay to ensure all components are mounted
		const timer = setTimeout(() => {
			ctx = gsap.context(() => {
				// Desktop (larger than 768px)
				mm.add("(min-width: 769px)", () => {
					gsap.to([".logoOverlay", ".scrollTriggerSection"], {
						autoAlpha: 0,
						ease: "none",
						scrollTrigger: {
							trigger: heroRef.current,
							start: "top top",
							end: "bottom 75%",
							pin: true,
							scrub: true,
							anticipatePin: 1,
							pinSpacing: true,
						},
					});
				});

				// Mobile (768px and below)
				mm.add("(max-width: 768px)", () => {
					gsap.to(".scrollTriggerSection", {
						autoAlpha: 0,
						ease: "none",
						scrollTrigger: {
							trigger: heroRef.current,
							start: "top top",
							end: "bottom 50%",
							pin: true,
							scrub: true,
							pinSpacing: true,
							anticipatePin: 1,
							invalidateOnRefresh: true,
						},
					});
				});
			});

			// Refresh ScrollTrigger after initialization and handle mobile address bar
			ScrollTrigger.refresh();

			// Additional refresh after a short delay to account for mobile browser UI
			setTimeout(() => {
				ScrollTrigger.refresh();
			}, 500);
		}, 100);

		return () => {
			clearTimeout(timer);
			mm.revert(); // Properly revert matchMedia
			if (ctx) {
				ctx.revert();
			}
		};
	}, []);

	return (
		<div>
			<div className="homeMain headerAdjustment" id="homeMain">
				<Header />
				<section ref={heroRef} className="scrollTriggerSection" style={{ height: "100dvh !important", position: "relative" }}>
					<div className="logoOverlay">
						<Orb />
						<div className="overlayStroke">
							<div className="fill">BEN SCOTT</div>
							<div className="stroke">BEN SCOTT</div>
						</div>
					</div>
				</section>
				{/* ===== ABOUT ===== */}
				<About />
				<div className="overtop">
					{/* ===== WORK ===== */}
					<section className="selectedProjects section" ref={workRef}>
						<SectionHeading projectTitle="The Work" />
						<ProjectsBlock />
					</section>

					{/* ===== STACK ===== */}
					<section className="skillLevels" ref={stackRef}>
						<SectionHeading projectTitle="The Stack" />
						<Skills />
					</section>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
