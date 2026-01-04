import { useRef, useEffect } from "react";
import Orb from "../Components/Orb";
import ProjectsBlock from "../Components/ProjectsBlock";
import Skills from "../Components/Skills";
import Header from "../Components/Header";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
	const heroRef = useRef(null);
	const aboutRef = useRef(null);
	const aboutTextRef = useRef(null);
	const workRef = useRef(null);
	const stackRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			/**
			 * HERO — Pin + Logo Fade
			 */
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
				},
			});

			/**
			 * ABOUT SECTION — Pin + Word Color Animation
			 */
			// Manually split text into words
			if (aboutTextRef.current) {
				const text = aboutTextRef.current.textContent;
				aboutTextRef.current.innerHTML = text
					.split(" ")
					.map((word) => `<span class="word">${word}</span>`)
					.join(" ");
			}

			// Pin the about section
			ScrollTrigger.create({
				trigger: aboutRef.current,
				start: "top top",
				end: "+=200%",
				pin: true,
				anticipatePin: 1,
			});

			// Animate each word with stagger
			const words = aboutTextRef.current?.querySelectorAll(".word");
			if (words) {
				gsap.to(words, {
					color: "rgb(0, 0, 225)",
					duration: 0.0001,
					stagger: {
						each: 2 / words.length,
						ease: "none",
					},
					ease: "none",
					scrollTrigger: {
						trigger: aboutRef.current,
						start: "top top",
						end: "+=200%",
						scrub: true,
					},
				});
			}

			/**
			 * WORK SECTION — Keylines, Heading, Items
			 */
			const workTl = gsap.timeline({
				scrollTrigger: {
					trigger: workRef.current,
					start: "top center",
					once: true,
				},
			});

			// keylines
			workTl.fromTo(
				".selectedProjects .keyline",
				{ scaleX: 0 },
				{
					scaleX: 1,
					duration: 0.4,
					ease: "power2.out",
				}
			);

			// heading
			workTl.fromTo(
				".selectedProjects h1",
				{ autoAlpha: 0, y: 20 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.3,
					ease: "power2.out",
				},
				"-=0.3"
			);

			/**
			 * STACK SECTION — Keylines, Heading, Items
			 */
			const stackTl = gsap.timeline({
				scrollTrigger: {
					trigger: stackRef.current,
					start: "top 75%",
					once: true,
				},
			});

			// keylines
			stackTl.fromTo(
				".skillLevels .keyline",
				{ scaleX: 0 },
				{
					scaleX: 1,
					duration: 0.4,
					ease: "power2.out",
				}
			);

			// heading
			stackTl.fromTo(
				".skillLevels h1",
				{ autoAlpha: 0, y: 20 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.3,
					ease: "power2.out",
				},
				"-=0.3"
			);

			ScrollTrigger.refresh();
		});

		return () => ctx.revert();
	}, []);

	return (
		<div>
			<div className="homeMain headerAdjustment">
				<Header />
				<section ref={heroRef} className="scrollTriggerSection" style={{ height: "100vh", position: "relative" }}>
					<div className="logoOverlay">
						<Orb scrollSectionRef={heroRef} />
						<div className="overlayStroke">
							<div className="fill">BEN SCOTT</div>
							<div className="stroke">BEN SCOTT</div>
						</div>
					</div>
				</section>

				<div ref={aboutRef} className="aboutMe section">
					<p className="splitMe" ref={aboutTextRef}>
						I design and build immersive websites that don't just look good, they move, respond, and feel alive. From smooth interactions to real-time 3D experiences, I turn ideas into digital spaces people actually want to explore. I work across design, development, and motion to create sites that are fast, expressive, and technically solid. Whether it's a bold marketing site, an interactive product experience, or something a bit experimental, I focus on clarity, performance, and detail. The goal is simple: make the web feel less static, and a lot more memorable.
					</p>
				</div>

				<div className="overtop">
					{/* ===== WORK ===== */}
					<section className="selectedProjects section" ref={workRef}>
						<div className="sectionHeading">
							<span className="keyline keylineLeft"></span>
							<h1>The Work</h1>
							<span className="keyline keylineRight"></span>
						</div>
						<ProjectsBlock />
					</section>

					{/* ===== STACK ===== */}
					<section className="skillLevels" ref={stackRef}>
						<div className="sectionHeading">
							<span className="keyline keylineLeft"></span>
							<h1>The Stack</h1>
							<span className="keyline keylineRight"></span>
						</div>
						<Skills />
					</section>
				</div>
			</div>

			{/* <div style={{ height: "200vh" }} /> */}
		</div>
	);
}

export default Home;
