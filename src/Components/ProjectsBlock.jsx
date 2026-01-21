import { useEffect, useRef } from "react";
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

	const projects = [
		{
			slug: "confirmed",
			title: "Confirmed",
			created: "2026",
			link: "",
			image: confirmedAppImage,
			type: "ios app",
			tech: "React Native",
			status: "In Development",
			description: "A mobile event management app built with React Native. Features include event creation, guest management, and real-time updates. Currently in active development.",
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
			description: "Interactive web-based beer pong game developed for Canadian Club's promotional campaign. Built with Unity and exported for web, featuring physics-based gameplay and custom branding.",
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
			description: "Modern website for SongWorks music studio showcasing services, portfolio, and booking system. Built with React for smooth interactions and responsive design.",
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
			description: "Full-featured ecommerce bookstore built on WordPress and WooCommerce. Custom theme development with integrated inventory management and secure payment processing.",
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.delayedCall(0.1, () => {
				gsap.fromTo(
					".project",
					{ opacity: 0, y: 30 },
					{
						delay: 0.2,
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.15,
						ease: "power2.out",
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
				<div key={project.slug} className={`project project-tab ${project.slug}`}>
					<div className="projectImage">
						{project.image ? (
							<img src={project.image} alt={project.title} />
						) : (
							<div className="placeholderImage">Coming Soon</div>
						)}
					</div>
					<div className="projectContent">
						<div className="projectHeader">
							<h3 className="projectTitle">{project.title}</h3>
							<span className="projectYear">{project.created}</span>
						</div>
						<p className="projectDescription">{project.description}</p>
						<div className="projectMeta">
							<div className="metaItem">
								<span className="metaLabel">Status</span>
								<span className="metaValue">{project.status}</span>
							</div>
							<div className="metaItem">
								<span className="metaLabel">Type</span>
								<span className="metaValue">{project.type}</span>
							</div>
							<div className="metaItem">
								<span className="metaLabel">Tech</span>
								<span className="metaValue">{project.tech}</span>
							</div>
						</div>
						{project.link && project.link !== "/" && (
							<a href={project.link} target="_blank" rel="noopener noreferrer" className="projectLink">
								Visit Site →
							</a>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
