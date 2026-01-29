import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import overBeerPongImage from "../static/images/overbeerpong_render.jpg";
import songWorksImage from "../static/images/songWorks_render.jpg";
import dextersBookCo from "../static/images/dexters.jpg";
import confirmedAppImage from "../static/images/confirmedapp.jpg";

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
			slug: "dexters",
			title: "Dexter's Book Co.",
			created: "2026",
			link: null,
			image: dextersBookCo,
			type: "Ecommerce Store",
			tech: "Wordpress, Woocoomerce",
			status: "In Progress",
			description: "Full-featured ecommerce bookstore built on WordPress and WooCommerce. Custom theme development with integrated inventory management and secure payment processing.",
		},
		{
			slug: "overbeerpong",
			title: "Over Beer Pong",
			created: "2025",
			link: "https://overbeerpong.ccpromotions.com.au",
			image: overBeerPongImage,
			type: "web hosted video game",
			tech: "Unity, C#, HTML",
			status: "In Progress",
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

	const hover = (e) => {
		const card = e.currentTarget;

		// Kill any ongoing animation
		gsap.killTweensOf(card);

		gsap.to(card, {
			rotate: "2deg",
			// scale: 1.02,
			duration: 0.3,
			ease: "power2.out"
		});
	}

	const leave = (e) => {
		const card = e.currentTarget;

		// Kill any ongoing animation
		gsap.killTweensOf(card);

		// Swing back with momentum
		gsap.to(card, {
			rotate: "0deg",
			duration: 1,
			ease: "elastic.out(1, 0.4)"
		});
	}

	return (
		<div className="projects" ref={projectsRef}>
			{projects.map((project) => (
				<div key={project.slug} className={`project ${project.slug}`}>
					<div className="frameContainer" onMouseEnter={hover} onMouseLeave={leave} >
						<div className="frameWireWrapper">
							<svg className="frameWire" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.28 96.69">

								<polyline class="cls-1" points=".37 96.35 85.08 1.38 159.88 96.35" />
								<circle class="cls-2" cx="85.2" cy="1.38" r="1.38" />
							</svg>
						</div>
						<div className="projectItem">

							<div className="frame" >
								<div className="projectImage">
									<img src={project.image} alt={project.title} />
								</div>
							</div>
						</div>
					</div>
					<div className="projectInfo">
						<div className="projectHeader">
							<h1 className="projectTitle">{project.title}</h1>
							<p className="projectCreated" >[{project.created}]</p>
						</div>
						<div className="projectMeta">
							<div className="projectStack">
								<p className="metaTitle">STACK</p>
								<p className="metaContent">{project.tech}</p>
							</div>
							<div className="projectStatus">
								<p className="metaTitle">STATUS</p>
								<p className="metaContent">{project.status}</p>
							</div>
							{project.link && (
								<div className="projectLink">
									<a className="metaLink" href={project.link}>SEE MORE</a>
								</div>
							)}
						</div>
					</div>
				</div>


			))}
		</div>
	);
}
