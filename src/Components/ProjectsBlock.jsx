import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import overBeerPongImage from "../static/images/overbeerpong.jpg";
import jerryCanCreativeImage from "../static/images/jerrycancreative.png";

function PixelatedImage({ src, pixelSize }) {
	const canvasRef = useRef(null);
	const imgRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const img = imgRef.current;

		const drawPixelated = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			if (pixelSize <= 9) return;

			for (let y = 0; y < canvas.height; y += pixelSize) {
				for (let x = 0; x < canvas.width; x += pixelSize) {
					const imageData = ctx.getImageData(x, y, pixelSize, pixelSize);
					let r = 0,
						g = 0,
						b = 0;

					for (let i = 0; i < imageData.data.length; i += 4) {
						r += imageData.data[i];
						g += imageData.data[i + 1];
						b += imageData.data[i + 2];
					}

					const pixels = imageData.data.length / 4;
					r = Math.floor(r / pixels);
					g = Math.floor(g / pixels);
					b = Math.floor(b / pixels);

					ctx.fillStyle = `rgb(${r},${g},${b})`;
					ctx.fillRect(x, y, pixelSize, pixelSize);
				}
			}
		};

		if (!img.complete) {
			img.onload = drawPixelated;
		} else {
			drawPixelated();
		}
	}, [src, pixelSize]);

	return (
		<div className="projectImageWrapper" style={{ position: "relative" }}>
			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					transition: "opacity 0.4s ease",
					scale: 1.05,
					opacity: pixelSize <= 1 ? 0 : 1,
				}}
				className="pixelOverlay"
			/>
			<img ref={imgRef} src={src} alt="" className="projectImage" style={{ width: "100%", height: "100%", display: "block" }} />
		</div>
	);
}

export default function ProjectsBlock() {
	const intervalsRef = useRef({});

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

	const [pixelSizes, setPixelSizes] = useState(
		projects.reduce((acc, project) => {
			acc[project.slug] = 36;
			return acc;
		}, {})
	);

	const dissipatePixels = (slug) => {
		if (intervalsRef.current[slug]) {
			clearInterval(intervalsRef.current[slug]);
		}

		intervalsRef.current[slug] = setInterval(() => {
			setPixelSizes((prev) => {
				const currentSize = prev[slug];
				if (currentSize <= 1) {
					clearInterval(intervalsRef.current[slug]);
					return { ...prev, [slug]: 1 };
				}
				return { ...prev, [slug]: Math.max(1, currentSize - 6) };
			});
		}, 25);
	};

	const rePixelate = (slug) => {
		if (intervalsRef.current[slug]) {
			clearInterval(intervalsRef.current[slug]);
		}

		intervalsRef.current[slug] = setInterval(() => {
			setPixelSizes((prev) => {
				const currentSize = prev[slug];
				if (currentSize >= 36) {
					clearInterval(intervalsRef.current[slug]);
					return { ...prev, [slug]: 36 };
				}
				return { ...prev, [slug]: Math.min(36, currentSize + 6) };
			});
		}, 25);
	};

	useEffect(() => {
		return () => {
			Object.values(intervalsRef.current).forEach((interval) => {
				if (interval) clearInterval(interval);
			});
		};
	}, []);

	return (
		<div className="projects">
			{projects.map((project) => (
				<div
					key={project.slug}
					className={`project ${project.slug}`}
					onMouseEnter={() => dissipatePixels(project.slug)}
					onMouseLeave={(e) => {
						rePixelate(project.slug);
						const titleEl = e.currentTarget.querySelector(".projectTitle");
						if (titleEl) {
							gsap.to(titleEl, {
								xPercent: 0,
								yPercent: 0,
								opacity: 0,
								duration: 0.4,
							});
						}
					}}
					onMouseMove={(e) => {
						const titleEl = e.currentTarget.querySelector(".projectTitle");
						if (!titleEl) return;

						const bounds = e.currentTarget.getBoundingClientRect();
						const offsetX = e.clientX - bounds.left + 10;
						const offsetY = e.clientY - bounds.top;

						gsap.to(titleEl, {
							x: offsetX,
							y: offsetY,
							opacity: 1,
							duration: 0.2,
							ease: "power2.out",
						});
					}}>
					<PixelatedImage src={project.image} pixelSize={pixelSizes[project.slug]} />
					<div className="projectTitle">
						<p>{project.title}</p>
						<p>{project.created}</p>
					</div>
				</div>
			))}
		</div>
	);
}
