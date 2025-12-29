import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import overBeerPongImage from "../static/images/overbeerpong.jpg";
import jerryCanCreativeImage from "../static/images/jerrycancreative.png";

export default function ProjectsBlock() {
	const projects = [
		{
			slug: "overbeerpong",
			title: "Over Beer Pong",
			created: "2025",
			link: "/",
			image: overBeerPongImage,
		},
		{
			slug: "jerrycancreative",
			title: "Jerry Can Creative",
			created: "2025",
			link: "/",
			image: jerryCanCreativeImage,
		},
		{
			slug: "overbeerpong3",
			title: "Over Beer Pong 3",
			created: "2025",
			link: "/",
			image: overBeerPongImage,
		},
	];

	useEffect(() => {
		// Wrap in gsap.context for proper cleanup and ScrollSmoother compatibility
		const ctx = gsap.context(() => {
			// Wait for next tick to ensure ScrollSmoother is initialized
			gsap.delayedCall(0.1, () => {
				gsap.fromTo(
					".project",
					{ opacity: 0 },
					{
						delay: 0.6,
						opacity: 1,
						duration: 0.5,
						stagger: 0.4,
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
		<div className="projects">
			{projects.map((project) => (
				<div key={project.slug} className={`project ${project.slug}`}>
					<div className="projectImageWrapper">
						<img className="projectImage" src={project.image} alt={project.title} />
					</div>
					<div className="projectTitle">
						<p>{project.title} / </p>
						<p>/ {project.created}</p>
					</div>
				</div>
			))}
		</div>
	);
}
