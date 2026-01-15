import { useRef, useEffect } from "react";
import Orb from "../Components/Orb";
import ProjectsBlock from "../Components/ProjectsBlock";
import Skills from "../Components/Skills";
import SectionHeading from "../Components/SectionHeading";
import About from "../Components/About";
import Footer from "../Components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Home() {
	const heroRef = useRef(null);
	const workRef = useRef(null);
	const stackRef = useRef(null);

	useEffect(() => {
		let ctx;
		let smoother;
		const mm = gsap.matchMedia();
		const timer = setTimeout(() => {
			smoother = ScrollSmoother.create({
				wrapper: "#smooth-wrapper",
				content: "#smooth-content",
				smooth: 1,
				effects: true,
				smoothTouch: 0.1,
				normalizeScroll: true,
			});

			ctx = gsap.context(() => {
				// Desktop (larger than 768px)
				mm.add("(min-width: 769px)", () => {
					gsap.to([".logoOverlay", ".scrollTriggerSection"], {
						ease: "none",
						autoAlpha: 0,
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
			if (smoother) {
				smoother.kill();
			}
			mm.revert(); // Properly revert matchMedia
			if (ctx) {
				ctx.revert();
			}
		};
	}, []);

	return (
		<div>
			<div className="homeMain headerAdjustment" id="homeMain">
				<section ref={heroRef} className="scrollTriggerSection">
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
						<SectionHeading projectTitle="SELECTED" />
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
