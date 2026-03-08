import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE = 'a, button, input, label, select, textarea, [role="button"], [tabindex]';

function CustomCursor() {
	const cursorRef = useRef(null);

	useEffect(() => {
		if (!window.matchMedia("(pointer: fine)").matches) return;

		const cursor = cursorRef.current;
		gsap.set(cursor, { xPercent: -50, yPercent: -50 });

		const onMove = (e) => {
			gsap.to(cursor, {
				x: e.clientX,
				y: e.clientY,
				duration: 0.1,
				ease: "power2.out",
				overwrite: true,
			});
		};



		window.addEventListener("mousemove", onMove);

		return () => {
			window.removeEventListener("mousemove", onMove);
		};
	}, []);

	return <div ref={cursorRef} className="customCursor" aria-hidden="true" />;
}

export default CustomCursor;
