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

		// Small delay to ensure all components are mounted
		const timer = setTimeout(() => {
			ctx = gsap.context(() => {
				/**
				 * HERO — Pin + Logo Fade
				 */
				const isMobile = window.innerWidth <= 768;

				gsap.to([".logoOverlay", ".scrollTriggerSection"], {
					autoAlpha: 0,
					ease: "none",
					scrollTrigger: {
						trigger: heroRef.current,
						start: "top top",
						end: isMobile ? "bottom 50%" : "bottom 75%",
						pin: !isMobile,
						scrub: true,
						anticipatePin: isMobile ? 0 : 1,
					},
				});
			});

			// Refresh ScrollTrigger after initialization
			ScrollTrigger.refresh();
		}, 100);

		return () => {
			clearTimeout(timer);
			if (ctx) {
				ctx.revert();
			}
		};
	}, []);

	return (
		<div>
			<div className="homeMain headerAdjustment" id="homeMain">
				<Header />
				<section ref={heroRef} className="scrollTriggerSection" style={{ height: "100vh", position: "relative" }}>
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
