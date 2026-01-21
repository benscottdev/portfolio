import { useEffect, useRef } from "react";
import gsap from "gsap";

function Skills() {
	const skillsRef = useRef(null);

	const skillMatrix = {
		"React JS": { proficiency: 70, experience: 3, lastProject: 'Portfolio' },
		"JavaScript": { proficiency: 80, experience: 4, lastProject: 'Portfolio' },
		"HTML/CSS": { proficiency: 90, experience: 4, lastProject: "Portfolio" },
		"GSAP": { proficiency: 65, experience: 2, lastProject: "Portfolio" },
		"Three.js": { proficiency: 80, experience: 1, lastProject: "Portfolio" },
		"React Native": { proficiency: 75, experience: 1, lastProject: "Confirmed" },
		"Unity": { proficiency: 75, experience: 0.5, lastProject: "Over Beer Pong" },
		"Blender": { proficiency: 60, experience: 1, lastProject: "Jerry Can Creative" },
		"After Effects": { proficiency: 70, experience: 2, lastProject: "Canadian Club" },
		"Figma": { proficiency: 70, experience: 2, lastProject: "Fusion Telemetry" },
		"Photoshop": { proficiency: 75, experience: 4, lastProject: "Portfolio" },
		"Illustrator": { proficiency: 60, experience: 4, lastProject: "Confirmed" },
		"PHP": { proficiency: 70, experience: 2, lastProject: "Promotional Website" },
		"SQL": { proficiency: 60, experience: 2, lastProject: "Promotional Website" },
		"WordPress": { proficiency: 75, experience: 2, lastProject: "Fuel Sydney" },
		"C#": { proficiency: 30, experience: 0.5, lastProject: "Over Beer Pong" },
	};

	const dimensions = [
		{ key: "proficiency", label: "Proficiency" },
		{ key: "experience", label: "Experience (Yrs)" },
		// { key: "lastProject", label: "lastProject" },
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate matrix rows
			gsap.from(".matrix-row", {
				opacity: 0,
				x: -20,
				duration: 0.5,
				stagger: 0.05,
				delay: 0.2,
				ease: "power2.out",
			});
		}, skillsRef);

		return () => ctx.revert();
	}, []);

	return (
		<div className="skills" ref={skillsRef}>
			<div className="skills-matrix">
				<div className="matrix-header">
					<div className="cell label-cell">Skill</div>
					{dimensions.map((dim) => (
						<div key={dim.key} className="cell header-cell">
							{dim.label}
						</div>
					))}
				</div>
				{Object.entries(skillMatrix).map(([skill, values]) => (
					<div key={skill} className="matrix-row">
						<div className="cell label-cell">{skill}</div>
						{dimensions.map((dim) => (
							<div key={dim.key} className="cell value-cell" data-intensity={Math.ceil(values[dim.key] / 20)}>
								{values[dim.key]}
								{dim.key === "proficiency" && "%"}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default Skills;
