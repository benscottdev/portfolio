import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Skills() {
	const skillsArray = [
		{
			skillName: "React",
			skillTypes: ["development"],
		},
		{
			skillName: "JavaScript",
			skillTypes: ["development"],
		},
		{
			skillName: "HTML",
			skillTypes: ["development"],
		},
		{
			skillName: "CSS",
			skillTypes: ["development"],
		},
		{
			skillName: "Three.js",
			skillTypes: ["development", "3D"],
		},
		{
			skillName: "SQL",
			skillTypes: ["development"],
		},
		{
			skillName: "GSAP",
			skillTypes: ["development"],
		},
		{
			skillName: "PHP",
			skillTypes: ["development"],
		},
		{
			skillName: "Wordpress",
			skillTypes: ["development"],
		},
		{
			skillName: "C#",
			skillTypes: ["development"],
		},
		{
			skillName: "Unity",
			skillTypes: ["development", "3D"],
		},
		{
			skillName: "Blender",
			skillTypes: ["3D"],
		},
		{
			skillName: "After Effects",
			skillTypes: ["3D"],
		},
		{
			skillName: "Figma",
			skillTypes: ["design"],
		},
		{
			skillName: "Photoshop",
			skillTypes: ["design"],
		},
		{
			skillName: "Illustrator",
			skillTypes: ["design"],
		},
		{
			skillName: "React Native",
			skillTypes: ["development"],
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Wait for next tick to ensure ScrollSmoother is initialized
			gsap.delayedCall(0.1, () => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".skills",
						start: "top center",
						end: "bottom top",
					},
				});

				tl.fromTo(
					".skillColumn h2",
					{ scaleX: 0 },
					{
						delay: 0.4,
						scaleX: 1,
						duration: 0.5,
						ease: "power2.out",
						stagger: 0.1,
					}
				);

				tl.fromTo(
					".skill",
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 0.1,
						stagger: 0.05,
						ease: "none",
					}
				);
			});
		});
		return () => ctx.revert();
	}, []);

	return (
		<div className="skills">
			<div className="skillColumn third skillsDevelopment">
				{/* <span className="keyline"></span> */}
				<h2>Development</h2>
				{skillsArray.map((skill) => {
					if (skill.skillTypes.includes("development")) {
						return (
							<div className="skill" key={skill.skillName}>
								<h3>{skill.skillName}</h3>
							</div>
						);
					}
				})}
			</div>
			<div className="skillColumn third skills3d">
				{/* <span className="keyline"></span> */}
				<h2>3D</h2>
				{skillsArray.map((skill) => {
					if (skill.skillTypes.includes("3D")) {
						return (
							<div className="skill" key={skill.skillName}>
								<h3>{skill.skillName}</h3>
							</div>
						);
					}
				})}
			</div>
			<div className="skillColumn third skillsDesign">
				{/* <span className="keyline"></span> */}
				<h2>Design</h2>
				{skillsArray.map((skill) => {
					if (skill.skillTypes.includes("design")) {
						return (
							<div className="skill" key={skill.skillName}>
								<h3>{skill.skillName}</h3>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}

export default Skills;
