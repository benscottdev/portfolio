import React, { useRef } from "react";
import SydneyTime from "./SydneyTime";

import gsap from "gsap";

function Header() {
	const linkWrapperRef = useRef();

	let handleHover;
	let handleLeave;

	if (window.innerWidth > 800) {
		handleHover = (ref) => {
			const top = ref.current.querySelector("#top");
			const bottom = ref.current.querySelector("#bottom");

			// end previous tweens before the next anim starts
			gsap.killTweensOf([top, bottom]);

			gsap.to(top, {
				y: "-100%",
				duration: 0.2,
				ease: "power3.out",
			});

			gsap.to(bottom, {
				y: "-100%",
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
		<div className="header">
			<SydneyTime />
			{/* <span className="logo">BEN SCOTT</span> */}
			<div className="startAProject">
				<div className="linkWrapper" ref={linkWrapperRef} onMouseEnter={() => handleHover(linkWrapperRef)} onMouseLeave={() => handleLeave(linkWrapperRef)}>
					<a id="top" href="mailto:benscott.dev@gmail.com" target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
						<span>LET'S CHAT</span>
					</a>
					{window.innerWidth > 800 && (
						<a id="bottom" href="mailto:benscott.dev@gmail.com" target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
							<span>LET'S CHAT</span>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
