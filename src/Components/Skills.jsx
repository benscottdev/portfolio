import React from "react";

function Skills() {
	const skillsData = [
		{
			skillName: "HTML",
			projectCount: "50+",
			skillLevel: 90,
		},
		{
			skillName: "CSS3 & SCSS",
			projectCount: "50+",
			skillLevel: 80,
		},
		{
			skillName: "JavaScript",
			projectCount: "50+",
			skillLevel: 75,
		},
		{
			skillName: "ReactJS",
			projectCount: "15-25",
			skillLevel: 69,
		},
		{
			skillName: "THREEJS",
			projectCount: "10-20",
			skillLevel: 69,
		},
		{
			skillName: "PHP",
			projectCount: "50+",
			skillLevel: 75,
		},
		{
			skillName: "Wordpress",
			projectCount: "10-20",
			skillLevel: 70,
		},
		{
			skillName: "React Native",
			projectCount: "3",
			skillLevel: 35,
		},
		{
			skillName: "Unity",
			projectCount: "5-10",
			skillLevel: 35,
		},
		{
			skillName: "Figma",
			projectCount: "30-40",
			skillLevel: 65,
		},
		{
			skillName: "Adobe Suite",
			projectCount: "50+",
			skillLevel: 65,
		},
		{
			skillName: "Blender",
			projectCount: "50+",
			skillLevel: 75,
		},
	];
	return (
		<div className="skills">
			<div className="tableHead">
				<span>STATS</span>
				<span>PROJECT COUNT</span>
				<span>XP</span>
			</div>
			{skillsData.map((skillItem) => (
				<div className="skillItemWrapper">
					<div className="skillTitleWrapper third">
						<span className="skillTitle skillData">{skillItem.skillName}</span>
					</div>
					<div className="skillProjectCountWrapper third">
						<span className="skillProjectCount skillData">{skillItem.projectCount}</span>
					</div>
					<div className="skillLevelWrapper third">
						<div className="skillLevel skillData" style={{ width: `${skillItem.skillLevel}%` }}></div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Skills;
