import React, { useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";

function Header() {
	const linkWrapperRef = useRef();

	const handleHover = (ref) => {
		const top = ref.current.querySelector("#top");
		const bottom = ref.current.querySelector("#bottom");

		// end previous tweens before the next anim starts
		gsap.killTweensOf([top, bottom]);

		gsap.to(top, {
			y: "-78%",
			duration: 0.4,
			ease: "power3.out",
		});

		gsap.to(bottom, {
			y: "-70%",
			duration: 0.4,
			scale: 1,
			ease: "power3.out",
		});
	};

	const handleLeave = (ref) => {
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

	return (
		<div className="header">
			{/* <span className="logo">BEN SCOTT</span> */}
			<Link className="startAProject">
				<div className="linkWrapper" ref={linkWrapperRef} onMouseEnter={() => handleHover(linkWrapperRef)} onMouseLeave={() => handleLeave(linkWrapperRef)}>
					<span id="top">START A PROJECT</span>
					<span id="bottom">START A PROJECT</span>
				</div>
			</Link>
		</div>
	);
}

export default Header;
