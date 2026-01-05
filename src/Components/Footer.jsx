import { useRef } from "react";
import gsap from "gsap";

function Footer() {
	const githubRef = useRef();
	const emailRef = useRef();
	const linkedinRef = useRef();
	const backToTopRef = useRef();

	let handleHover;
	let handleLeave;

	if (window.innerWidth > 800) {
		handleHover = (ref) => {
			const top = ref.current.querySelector("#top");
			const bottom = ref.current.querySelector("#bottom");

			// end previous tweens before the next anim starts
			gsap.killTweensOf([top, bottom]);

			gsap.to(top, {
				y: "-110%",
				duration: 0.2,
				ease: "power3.out",
			});

			gsap.to(bottom, {
				y: "-110%",
				duration: 0.2,
				ease: "power3.out",
			});
		};

		handleLeave = (ref) => {
			const top = ref.current.querySelector("#top");
			const bottom = ref.current.querySelector("#bottom");

			// end previous tweens before the next anim starts
			gsap.killTweensOf([top, bottom]);

			gsap.to(top, {
				y: 0,
				x: 0,
				scale: 1,
				duration: 0.35,
				ease: "power3.out",
			});

			gsap.to(bottom, {
				y: 0,
				duration: 0.35,
				ease: "power3.out",
			});
		};
	}

	return (
		<div className="footer">
			<div className="footer-content">
				<div className="linkWrapper" ref={githubRef} onMouseEnter={() => handleHover(githubRef)} onMouseLeave={() => handleLeave(githubRef)}>
					<a id="top" href="https://github.com/benscottdev" target="_blank">
						GitHub
					</a>
					{window.innerWidth > 800 && (
						<a id="bottom" href="https://github.com/benscottdev" target="_blank">
							GitHub
						</a>
					)}
				</div>

				<div className="linkWrapper" ref={emailRef} onMouseEnter={() => handleHover(emailRef)} onMouseLeave={() => handleLeave(emailRef)}>
					<a id="top" href="mailto:benscottdev@gmail.com">
						Email Me
					</a>
					{window.innerWidth > 800 && (
						<a id="bottom" href="mailto:benscottdev@gmail.com">
							Email Me
						</a>
					)}
				</div>

				<div className="linkWrapper" ref={linkedinRef} onMouseEnter={() => handleHover(linkedinRef)} onMouseLeave={() => handleLeave(linkedinRef)}>
					<a id="top" href="https://www.linkedin.com/in/ben-scott-2baba3185/" target="_blank">
						LinkedIn
					</a>
					{window.innerWidth > 800 && (
						<a id="bottom" href="https://www.linkedin.com/in/ben-scott-2baba3185/" target="_blank">
							LinkedIn
						</a>
					)}
				</div>
			</div>

			{window.innerWidth > 800 && (
				<div className="linkWrapper backToTopWrapper" ref={backToTopRef} onMouseEnter={() => handleHover(backToTopRef)} onMouseLeave={() => handleLeave(backToTopRef)}>
					<a id="top" href="#homeMain">
						Back to Top
					</a>
					{window.innerWidth > 800 && (
						<a id="bottom" href="#homeMain">
							Back to Top
						</a>
					)}
				</div>
			)}
		</div>
	);
}

export default Footer;
