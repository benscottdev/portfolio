import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SectionHeading({ number = "01", title }) {
	const rowRef = useRef(null);

	useEffect(() => {
		const chars = rowRef.current.querySelectorAll(".shChar");
		if (!chars.length) return;

		const trig = gsap.fromTo(
			chars,
			{ yPercent: 105 },
			{
				yPercent: 0,
				ease: "power3.out",
				stagger: 0.03,
				scrollTrigger: {
					trigger: rowRef.current,
					start: "top 88%",
					end: "top 58%",
					scrub: 0.6,
				},
			}
		);

		return () => trig.scrollTrigger?.kill();
	}, [title]);

	return (
		<div className="sectionHeading">
			<div className="sectionHeadingRow" ref={rowRef}>
				{/* <span className="sectionHeadingNum">[ {number} ]</span> */}
				<h2 className="sectionHeadingTitle" aria-label={title}>
					{title.split("").map((char, i) => (
						<span key={i} className="shCharClip">
							<span className="shChar">{char === " " ? "\u00A0" : char}</span>
						</span>
					))}
				</h2>
			</div>
		</div>
	);
}

export default SectionHeading;
