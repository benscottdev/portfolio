import { useRef, useEffect } from "react";
import Orb from "../Components/Orb";
import ProjectsBlock from "../Components/ProjectsBlock";
import Skills from "../Components/Skills";
import SectionHeading from "../Components/SectionHeading";
import About from "../Components/About";
import Footer from "../Components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FrameWall from '../Components/FrameWall'

gsap.registerPlugin(ScrollTrigger);

function Home() {
	const heroRef = useRef(null);
	const workRef = useRef(null);
	const stackRef = useRef(null);

	useEffect(() => {
		let ctx;


		ctx = gsap.context(() => {
			gsap.to(".scrollTriggerSection", {
				ease: "none",
				scrollTrigger: {
					trigger: heroRef.current,
					start: "top top",
					end: "bottom bottom",
					pin: true,
					scrub: true,
					pinSpacing: true,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
			});
		});

		// Refresh ScrollTrigger after initialization
		ScrollTrigger.refresh();

		return () => {
			if (ctx) {
				ctx.revert();
			}
		};
	}, []);

	return (
		<div>
			<div className="homeMain headerAdjustment" id="homeMain">
				<section ref={heroRef} className="scrollTriggerSection">
					<Orb />
					<div className="logoOverlay">
						<h1 className="benScott">BEN SCOTT</h1>
						<p>[dev]</p>
					</div>
				</section>
				{/* ===== ABOUT ===== */}
				<About />
				<div className="overtop">
					{/* ===== WORK ===== */}
					<section className="selectedProjects section" ref={workRef}>
						<SectionHeading projectTitle="SELECTED" subHeading="PROJECTS" />
						<ProjectsBlock />
						{/* <FrameWall /> */}
					</section>

					{/* ===== STACK ===== */}
					<section className="skillLevels section" ref={stackRef}>
						<SectionHeading projectTitle="STACK" subHeading="SKILLS" />
						{/* <Skills /> */}
					</section>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
