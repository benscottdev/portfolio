import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function Skills() {
	const skillsRef = useRef(null);
	const [expandedCluster, setExpandedCluster] = useState(null);

	const skillClusters = [
		{
			category: "Web",
			skills: [
				{ name: "HTML/CSS", proficiency: 90 },
				{ name: "JavaScript", proficiency: 85 },
				{ name: "React JS", proficiency: 75 },
				{ name: "GSAP", proficiency: 75 },
				{ name: "Three.js", proficiency: 60 },
			],
		},
		{
			category: "3D & Animation",
			skills: [
				{ name: "Blender", proficiency: 60 },
				{ name: "After Effects", proficiency: 70 },
				{ name: "Premiere", proficiency: 40 },
				{ name: "Unity", proficiency: 75 },
			],
		},
		{
			category: "Design",
			skills: [
				{ name: "Figma", proficiency: 70 },
				{ name: "Photoshop", proficiency: 75 },
				{ name: "Illustrator", proficiency: 60 },
			],
		},
		{
			category: "Backend",
			skills: [
				{ name: "PHP", proficiency: 60 },
				{ name: "SQL", proficiency: 60 },
				{ name: "WordPress", proficiency: 65 },
				{ name: "C#", proficiency: 30 },
			],
		},
		{
			category: "Mobile",
			skills: [{ name: "React Native", proficiency: 65 }],
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate clusters on load
			gsap.fromTo(
				".skill-cluster",
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.1,
					delay: 0.2,
					ease: "power2.out",
				}
			);
		}, skillsRef);

		return () => ctx.revert();
	}, []);

	return (
		<div className="skills" ref={skillsRef}>
			<div className="skills-clusters">
				{skillClusters.map((cluster, clusterIndex) => (
					<div
						key={clusterIndex}
						className={`skill-cluster expanded`}
						onMouseEnter={() => setExpandedCluster(clusterIndex)}
						onMouseLeave={() => setExpandedCluster(null)}
					>
						<div className="cluster-header">
							<h3>{cluster.category}</h3>
							<span className="skill-count">[{cluster.skills.length}]</span>
						</div>
						<div className="cluster-skills">
							{cluster.skills.map((skill, skillIndex) => (
								<div key={skillIndex} className="cluster-skill">
									<span className="skill-name">{skill.name}</span>
									<div className="proficiency-bar">
										<div
											className="proficiency-fill"
											style={{ width: `${skill.proficiency}%` }}
										/>
									</div>
									<span className="proficiency-value">{skill.proficiency}%</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Skills;
