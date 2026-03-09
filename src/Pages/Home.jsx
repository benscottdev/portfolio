import { useRef, useEffect } from "react";
import Orb from "../Components/Orb";
import ProjectsBlock from "../Components/ProjectsBlock";
import Skills from "../Components/Skills";
import SectionHeading from "../Components/SectionHeading";
import About from "../Components/About";
import Footer from "../Components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

function Home() {
	const heroRef = useRef(null);
	const workRef = useRef(null);


	return (
		<div>
			<div className="homeMain headerAdjustment" id="homeMain">

				<section ref={heroRef} className="scrollTriggerSection">

					<Orb />
					<div className="logoOverlay">
						<h1 className="benScott" id="logoFill">BEN SCOTT</h1>
					</div>
					<div className="logoOverlayStroke">
						<h1 className="benScott" id="logoStroke">BEN SCOTT</h1>
					</div>
					{/* <Skills /> */}
				</section>

				<About />
				<section className="selectedProjects section" ref={workRef}>
					<span className="divider"></span>
					<ProjectsBlock />
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
