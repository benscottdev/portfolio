import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import overBeerPongImage from "../static/images/overBeerPongImage.png";
import jerryCanCreativeImage from "../static/images/jerrycancreative.png";
import songWorksImage from "../static/images/songworks.png";
import dextersBookCo from "../static/images/dexter.png";
import confirmedAppImage from "../static/images/confirmedApp.png";

export default function ProjectsBlock() {
	const projectsRef = useRef(null);
	const [openProject, setOpenProject] = useState(null);
	const prevOpenProject = useRef(null);

	const projects = [
		{
			slug: "confirmed",
			title: "Confirmed",
			created: "2026",
			link: "",
			image: confirmedAppImage,
			type: "ios app",
			tech: "React Native",
			status: "Coming Soon",
		},
		{
			slug: "overbeerpong",
			title: "Over Beer Pong",
			created: "2025",
			link: "https://overbeerpong.ccpromotions.com.au",
			image: overBeerPongImage,
			type: "web hosted video game",
			tech: "Unity, C#, HTML",
			status: "With Client",
		},
		{
			slug: "jerrycancreative",
			title: "Jerry Can Creative",
			created: "2025",
			link: "/",
			image: jerryCanCreativeImage,
			type: "Website",
			tech: "React, ThreeJS",
			status: "In Progress",
		},
		{
			slug: "songworks",
			title: "SongWorks",
			created: "2024",
			link: "https://songworks.com.au",
			image: songWorksImage,
			type: "Website",
			tech: "React",
			status: "Completed",
		},
		{
			slug: "dexters",
			title: "Dexter's Book Co.",
			created: "2026",
			link: "https://dextersbookco.com.au",
			image: dextersBookCo,
			type: "Ecommerce Store",
			tech: "Wordpress, Woocoomerce",
			status: "In Progress",
		},
	];

	const toggleProject = (slug) => {
		// If clicking the same project, close it. Otherwise, open the new one
		if (openProject === slug) {
			setOpenProject(null);
		} else {
			setOpenProject(slug);
		}
	};

	useEffect(() => {
		// Animate closing the previous project
		if (prevOpenProject.current && prevOpenProject.current !== openProject) {
			const prevProjectElement = document.querySelector(`.project.${prevOpenProject.current}`);
			const prevDetailsPanel = prevProjectElement?.querySelector(".projectDetails");

			if (prevDetailsPanel) {
				gsap.to(prevDetailsPanel, {
					height: 0,
					opacity: 0,
					duration: 0.3,
					ease: "power2.in",
				});
			}
		}

		// Animate opening the new project
		if (openProject) {
			const projectElement = document.querySelector(`.project.${openProject}`);
			const detailsPanel = projectElement?.querySelector(".projectDetails");

			if (detailsPanel) {
				gsap.fromTo(
					detailsPanel,
					{
						height: 0,
						opacity: 0,
					},
					{
						height: "auto",
						opacity: 1,
						duration: 0.4,
						ease: "power2.out",
					}
				);
			}
		}

		// Update the previous project ref
		prevOpenProject.current = openProject;
	}, [openProject]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.delayedCall(0.1, () => {
				gsap.fromTo(
					".project",
					{ opacity: 0 },
					{
						delay: 0.2,
						opacity: 1,
						duration: 0,
						stagger: 0.1,
						ease: "none",
						scrollTrigger: {
							trigger: ".projects",
							start: "top center",
							end: "bottom top",
						},
					}
				);
			});
		});

		return () => ctx.revert();
	}, []);
	return (
		<div className="projects" ref={projectsRef}>
			{projects.map((project) => (
				<div key={project.slug} className={`project ${project.slug} ${openProject === project.slug ? "active" : ""}`} onClick={() => toggleProject(project.slug)}>
					<div className="projectHeader">
						<div className="projectCopy">
							<p className="title">{project.title}</p>
							<p className="created">{project.created}</p>
						</div>
						<div className="projectToggle">{openProject === project.slug ? "−" : "+"}</div>
					</div>

					{openProject === project.slug && (
						<div className="projectDetails">
							<div className="projectImage">{project.image ? <img src={project.image} alt={project.title} /> : <div className="placeholderImage">Coming Soon</div>}</div>
							<div className="projectInfo">
								<div className="infoRow">
									<span className="label">Status:</span>
									<span className="value">{project.status}</span>
								</div>
								<div className="infoRow">
									<span className="label">Project Type:</span>
									<span className="value">{project.type}</span>
								</div>
								<div className="infoRow">
									<span className="label">Tech: </span>
									<span className="value">{project.tech}</span>
								</div>
								<div className="infoRow">
									<span className="label">Year:</span>
									<span className="value">{project.created}</span>
								</div>
								{project.link && project.link !== "/" && (
									<a href={project.link} target="_blank" rel="noopener noreferrer" className="projectLink" onClick={(e) => e.stopPropagation()}>
										Visit Site →
									</a>
								)}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
