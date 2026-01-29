import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SectionHeading({ projectTitle, subHeading }) {
	const headingRef = useRef(null);

	useEffect(() => {
		const letters = headingRef.current.querySelectorAll(".char");

		gsap.fromTo(
			letters,
			{
				y: 200,
				opacity: 0,
			},
			{
				yPercent: 0,
				opacity: 1,
				ease: "none",
				stagger: {
					each: 0.08,
				},
				scrollTrigger: {
					trigger: headingRef.current,
					start: "top 85%",
					end: "top 50%",
					scrub: 1,
				},
			}
		);

		return () => ScrollTrigger.getAll().forEach(t => t.kill());
	}, []);

	return (
		<div className="sectionHeading">
			<h1 ref={headingRef} aria-label={projectTitle}>
				{projectTitle}
			</h1>
			<p>[{subHeading}]</p>
		</div>
	);
}

export default SectionHeading;
