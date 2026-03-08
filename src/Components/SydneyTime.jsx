import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function SydneyTime() {
	const [time, setTime] = useState("");
	const clockWrapperRef = useRef();

	const handleHover = (ref) => {
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

	useEffect(() => {
		const updateTime = () => {
			const formatter = new Intl.DateTimeFormat("en-AU", {
				timeZone: "Australia/Sydney",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			});

			setTime(formatter.format(new Date()));
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="clockWrapper" ref={clockWrapperRef} onMouseEnter={() => handleHover(clockWrapperRef)} onMouseLeave={() => handleLeave(clockWrapperRef)}>
			<div className="clock" id="top">
				SYD {time}
			</div>
			<div className="availability" id="bottom">
				{/* <span className="availabilityIcon"></span> */}
				FREELANCE AVAILABLE
			</div>
		</div>
	);
}

export default SydneyTime;
