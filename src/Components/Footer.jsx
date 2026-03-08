import { useRef } from "react";
import gsap from "gsap";

const isDesktop = window.innerWidth > 800;

function Footer() {
	const githubRef = useRef();
	const emailRef = useRef();
	const linkedinRef = useRef();
	const backToTopRef = useRef();

	const handleHover = (ref) => {
		if (!isDesktop) return;
		const top = ref.current.querySelector("#top");
		const bottom = ref.current.querySelector("#bottom");
		gsap.killTweensOf([top, bottom]);
		gsap.to(top, { y: "-110%", duration: 0.2, ease: "power3.out" });
		gsap.to(bottom, { y: "-110%", duration: 0.2, ease: "power3.out" });
	};

	const handleLeave = (ref) => {
		if (!isDesktop) return;
		const top = ref.current.querySelector("#top");
		const bottom = ref.current.querySelector("#bottom");
		gsap.killTweensOf([top, bottom]);
		gsap.to(top, { y: 0, x: 0, scale: 1, duration: 0.35, ease: "power3.out" });
		gsap.to(bottom, { y: 0, duration: 0.35, ease: "power3.out" });
	};

	return (
		<div className="footer">
			<div className="footerContent">
				<div className="linkWrapper" ref={githubRef} onMouseEnter={() => handleHover(githubRef)} onMouseLeave={() => handleLeave(githubRef)}>
					<a id="top" href="https://github.com/benscottdev" target="_blank" rel="noopener noreferrer">GitHub</a>
					{isDesktop && <a id="bottom" href="https://github.com/benscottdev" target="_blank" rel="noopener noreferrer">GitHub</a>}
				</div>

				<div className="linkWrapper" ref={emailRef} onMouseEnter={() => handleHover(emailRef)} onMouseLeave={() => handleLeave(emailRef)}>
					<a id="top" href="mailto:benscottdev@gmail.com">Email Me</a>
					{isDesktop && <a id="bottom" href="mailto:benscottdev@gmail.com">Email Me</a>}
				</div>

				<div className="linkWrapper" ref={linkedinRef} onMouseEnter={() => handleHover(linkedinRef)} onMouseLeave={() => handleLeave(linkedinRef)}>
					<a id="top" href="https://www.linkedin.com/in/ben-scott-2baba3185/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
					{isDesktop && <a id="bottom" href="https://www.linkedin.com/in/ben-scott-2baba3185/" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
				</div>
			</div>

			{isDesktop && (
				<div className="linkWrapper backToTopWrapper" ref={backToTopRef} onMouseEnter={() => handleHover(backToTopRef)} onMouseLeave={() => handleLeave(backToTopRef)}>
					<a id="top" href="#homeMain">Back to Top</a>
					<a id="bottom" href="#homeMain">Back to Top</a>
				</div>
			)}
		</div>
	);
}

export default Footer;
