import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import overBeerPongImage from "../static/images/overBeerPongImage.png";
import jerryCanCreativeImage from "../static/images/jerrycancreative.png";
import songWorksImage from "../static/images/songworks.png";
import dextersBookCo from "../static/images/dexter.png";

export default function ProjectsBlock() {
	const projectsRef = useRef(null);

	const projects = [
		{
			slug: "overbeerpong",
			title: "Over Beer Pong",
			created: "2025",
			link: "https://overbeerpong.ccpromotions.com.au",
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
			slug: "songworks",
			title: "SongWorks",
			created: "2024",
			link: "https://songworks.com.au",
			image: songWorksImage,
		},
		{
			slug: "dexters",
			title: "Dexter's Book Co.",
			created: "2026",
			link: "https://dextersbookco.com.au",
			image: dextersBookCo,
		},
	];

	const onHover = (e) => {
		const imageContainer = e.currentTarget.querySelector(".imageContainer");
		const imageHeight = imageContainer.offsetHeight;

		// Set initial position immediately before showing
		gsap.set(imageContainer, {
			x: e.clientX + 10,
			y: e.clientY - imageHeight / 2,
		});

		gsap.to(e.currentTarget.querySelector(".backgroundHover"), {
			yPercent: -100,
			duration: 0.2,
			ease: "power2.out",
		});
		gsap.to(e.currentTarget.querySelectorAll(".projectCopy p"), {
			color: "white",
			duration: 0.4,
			ease: "power2.out",
		});

		// Show the image
		gsap.to(imageContainer, {
			opacity: 1,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	const onLeave = (e) => {
		const imageContainer = e.currentTarget.querySelector(".imageContainer");

		gsap.to(e.currentTarget.querySelector(".backgroundHover"), {
			yPercent: 100,
			duration: 0.2,
			ease: "power2.out",
		});
		gsap.to(e.currentTarget.querySelectorAll(".projectCopy p"), {
			color: "rgb(0,0,225)",
			duration: 0.4,
			ease: "power2.out",
		});

		// Hide the image
		gsap.to(imageContainer, {
			opacity: 0,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	const onMouseMove = (e) => {
		const imageContainer = e.currentTarget.querySelector(".imageContainer");
		const imageHeight = imageContainer.offsetHeight;

		// Position image 10px to the right of cursor and vertically centered
		gsap.to(imageContainer, {
			x: e.clientX + 10,
			y: e.clientY - imageHeight / 2,
			duration: 0.1,
			ease: "power2.out",
		});
	};

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
				<div key={project.slug} className={`project ${project.slug}`} onMouseEnter={onHover} onMouseLeave={onLeave} onMouseMove={onMouseMove}>
					<a href={project.link} target="_blank">
						<div className="projectCopy">
							<p className="title">{project.title}</p>
							<p className="created">{project.created}</p>
						</div>
						<div className="backgroundHover"></div>
					</a>
					<div className="imageContainer">
						<img src={project.image} alt={project.title} />
					</div>
				</div>
			))}
		</div>
	);
}
