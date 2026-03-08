import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import benscottImage from '../static/images/ben-scott.png'

gsap.registerPlugin(ScrollTrigger);

function About() {
	const sectionRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".aboutAnimate", {
				opacity: 0,
				y: 28,
				duration: 0.8,
				stagger: 0.1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 72%",
					once: true,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} className="aboutSection">
			<div className="aboutInner">

				{/* LEFT — photo + quick stats */}
				<div className="aboutImageCol">
					{/* <div className="aboutPhoto aboutAnimate"> */}
					{/* <div className="aboutPhotoInner"> */}
					{/* <img src={benscottImage} alt="ben scott" /> */}
					{/* </div> */}
					{/* </div> */}

					<div className="aboutStats aboutAnimate">
						<div className="aboutStat">
							<span className="aboutStatLabel">Based</span>
							<span className="aboutStatValue">Sydney, AU</span>
						</div>
						<div className="aboutStat">
							<span className="aboutStatLabel">Status</span>
							<span className="aboutStatValue aboutStatAvailable">
								<span className="aboutAvailableDot" />
								Available
							</span>
						</div>
						<div className="aboutStat">
							<span className="aboutStatLabel">Focus</span>
							<span className="aboutStatValue">Web · Apps · Mobile · 3D</span>
						</div>
					</div>
				</div>

				{/* RIGHT — copy */}
				<div className="aboutContent">
					{/* <h2 className="aboutHeading aboutAnimate">
						Creative developer
					</h2> */}

					<div className="aboutBody aboutAnimate">
						<p>
							Hey, I’m Ben. I’m a developer and designer obsessed with smooth animations, clean code, and the little details that make experiences feel effortless.
						</p>
						<p>
							I create fast, interactive websites and apps that merge sleek design with solid engineering, from 3D web experiences and branded campaigns to full ecommerce stores and iOS apps.
						</p>
						<p>
							If you can imagine it, I’m already figuring out how to build it.
						</p>
					</div>
				</div>

			</div >
		</section >
	);
}

export default About;
