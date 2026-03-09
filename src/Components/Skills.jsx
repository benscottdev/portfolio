const skillClusters = [
	{ category: "Web", skills: ["HTML", "CSS & SCSS", "JavaScript", "TypeScript", "React", "GSAP", "Three.js"] },
	{ category: "3D & Animation", skills: ["Blender", "After Effects", "Unity"] },
	{ category: "Design", skills: ["Figma", "Adobe Suite"] },
	{ category: "Backend", skills: ["PHP", "SQL", "WordPress", "C#"] },
	{ category: "Mobile", skills: ["React Native"] },
];

const allSkills = skillClusters.flatMap((c) => c.skills);

function Skills() {
	return (
		<div className="skillsTicker">
			<div className="skillsTickerTrack" aria-hidden="true">
				<div className="skillsTickerInner">
					{allSkills.map((name, i) => (
						<span key={`a-${i}`} className="skillsTickerItem">{name}</span>
					))}
				</div>
				<div className="skillsTickerInner" aria-hidden="true">
					{allSkills.map((name, i) => (
						<span key={`b-${i}`} className="skillsTickerItem">{name}</span>
					))}
				</div>
			</div>
		</div>
	);
}

export default Skills;
