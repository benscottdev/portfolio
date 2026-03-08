import { useState } from "react";
import overBeerPongImage from "../static/images/overbeerRender.jpg";
import songWorksImage from "../static/images/songworksRender.jpg";
import dextersBookCo from "../static/images/dextersRender.jpg";
import anchorImage from "../static/images/AnchorRender.jpg";
import confirmedAppImage from "../static/images/confirmedRender.jpg";

const projects = [
	{
		slug: "anchor",
		title: "Anchor",
		created: "2026",
		link: "https://useanchor.xyz",
		image: anchorImage,
		type: "Mac & Windows",
		tech: "React, Electron, Swift, Claude",
		status: "In Development",
		description:
			"Anchor is a digital self-control app that helps block access to gambling and other online triggers. Using layered protections and thoughtful design, it gives users space to manage urges and build healthier online habits.",
	},
	{
		slug: "confirmed",
		title: "Confirmed",
		created: "2026",
		link: "",
		image: confirmedAppImage,
		type: "iOS App",
		tech: "React Native",
		status: "In Development",
		description:
			"A mobile event management app built with React Native. Features include event creation, guest management, and real-time updates. Currently in active development.",
	},

	{
		slug: "overbeerpong",
		title: "Over Beer Pong",
		created: "2025",
		link: "https://overbeerpong.ccpromotions.com.au",
		image: overBeerPongImage,
		type: "Web Game",
		tech: "Unity, C#, HTML",
		status: "Completed",
		description:
			"Interactive web-based beer pong game developed for Canadian Club's promotional campaign. Built with Unity and exported for web, featuring physics-based gameplay and custom branding.",
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
		description:
			"Modern website for SongWorks music studio showcasing services, portfolio, and booking system. Built with React for smooth interactions and responsive design.",
	},
	{
		slug: "dexters",
		title: "Dexter's Book Co.",
		created: "2026",
		link: null,
		image: dextersBookCo,
		type: "Ecommerce Store",
		tech: "WordPress, WooCommerce",
		status: "In Progress",
		description:
			"Full-featured ecommerce bookstore built on WordPress and WooCommerce. Custom theme development with integrated inventory management and secure payment processing.",
	},
];

export default function ProjectsBlock() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selected = projects[selectedIndex];

	const prev = () => setSelectedIndex((selectedIndex - 1 + projects.length) % projects.length);
	const next = () => setSelectedIndex((selectedIndex + 1) % projects.length);

	return (
		<div className="projectsLayout">

			{/* <div className="projectsHudBar">
				<span className="projectsHudSys">[ SYS:PORTFOLIO ]</span>
				<span className="projectsHudTitle">{selected.title}</span>
				<span className="projectsHudCount">
					{String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
				</span>
			</div> */}

			<nav className="projectsList" aria-label="Project list">
				{projects.map((project, index) => (
					<button
						key={project.slug}
						type="button"
						className={`projectsListItem ${selectedIndex === index ? "isSelected" : ""}`}
						onClick={() => setSelectedIndex(index)}
					>
						<span className="projectsListNum">{String(index + 1).padStart(2, "0")}</span>
						<span className="projectsListInfo">
							<span className="projectsListTitle">{project.title}</span>
							<span className="projectsListType">{project.type}</span>
						</span>
						<span className="projectsListArrow">›</span>
					</button>
				))}
			</nav>

			<div className="projectsDetail" key={selected.slug}>
				<div className="projectsMobileNav" aria-label="Navigate projects">
					<button className="projectsMobileNavBtn" onClick={prev} aria-label="Previous project">
						← Prev
					</button>
					<span className="projectsMobileNavCount">
						{String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
					</span>
					<button className="projectsMobileNavBtn" onClick={next} aria-label="Next project">
						Next →
					</button>
				</div>

				<div className="projectsDetailImage">
					<img src={selected.image} alt={selected.title} />
					<span className="projectsDetailBadge">{selected.status}</span>
					<div className="imgCorners" aria-hidden="true">
						<span className="c tl" />
						<span className="c tr" />
						<span className="c bl" />
						<span className="c br" />
					</div>
				</div>

				<div className="projectsDetailContent">
					<div className="projectsDetailHeader">
						<h2 className="projectsDetailTitle">{selected.title}</h2>
						<span className="projectsDetailYear">{selected.created}</span>
					</div>

					<p className="projectsDetailDesc">{selected.description}</p>

					<div className="projectsDetailFooter">
						<div className="projectsDetailMetaRow">
							<div className="projectsDetailMetaItem">
								<span className="projectsDetailLabel">// TYPE</span>
								<span className="projectsDetailValue">{selected.type}</span>
							</div>
							<div className="projectsDetailMetaItem">
								<span className="projectsDetailLabel">// STACK</span>
								<span className="projectsDetailValue">{selected.tech}</span>
							</div>
						</div>

						{selected.link && (
							<a
								href={selected.link}
								target="_blank"
								rel="noopener noreferrer"
								className="projectsDetailLink"
							>
								Launch ↗
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
