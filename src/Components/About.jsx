import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
	const aboutContainerRef = useRef(null);
	const aboutTextRef = useRef(null);

	useEffect(() => {
		// Ensure refs are ready
		if (!aboutContainerRef.current || !aboutTextRef.current) return;

		// Manually split text into words
		const text = aboutTextRef.current.textContent;
		aboutTextRef.current.innerHTML = text
			.split(" ")
			.map((word) => `<span class="word">${word}</span>`)
			.join(" ");

		const words = aboutTextRef.current.querySelectorAll(".word");
		let scrollTrigger;

		// Small delay to ensure layout is stable
		const timer = setTimeout(() => {
			// Single ScrollTrigger for both pinning and animation
			scrollTrigger = ScrollTrigger.create({
				trigger: aboutContainerRef.current,
				start: "top top",
				end: "+=200%",
				pin: true,
				scrub: true,
				anticipatePin: 1,
				onUpdate: (self) => {
					// Calculate how many words should be blue based on progress
					const progress = self.progress;
					const wordsToColor = Math.floor(progress * words.length);

					words.forEach((word, index) => {
						if (index < wordsToColor) {
							word.style.color = "rgb(0, 0, 225)";
						} else {
							word.style.color = "rgb(236, 236, 236)";
						}
					});
				},
			});
		}, 150);

		return () => {
			clearTimeout(timer);
			if (scrollTrigger) {
				scrollTrigger.kill();
			}
		};
	}, []);

	return (
		<div ref={aboutContainerRef} className="aboutMe section">
			<p className="splitMe" ref={aboutTextRef}>
				I design and build immersive websites that don't just look good, they move, respond, and feel alive. From smooth interactions to real-time 3D experiences, I turn ideas into digital spaces people actually want to explore. I work across design, development, and motion to create sites that are fast, expressive, and technically solid. Whether it's a bold marketing site, an interactive product experience, or something a bit experimental, I focus on clarity, performance, and detail. The goal is simple: make the web feel less static, and a lot more memorable.
			</p>
		</div>
	);
}

export default About;
