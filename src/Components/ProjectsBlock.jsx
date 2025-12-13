import React, { useRef, useEffect, useState } from "react";
import overBeerPong from "../static/images/overbeerpong.jpg";

function PixelatedImage({ src, pixelSize }) {
	const canvasRef = useRef(null);
	const imgRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const img = imgRef.current;

		if (!img.complete) {
			img.onload = () => drawPixelated();
		} else {
			drawPixelated();
		}

		function drawPixelated() {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			// If pixelSize is 1 or less, just show the original image
			if (pixelSize <= 1) {
				return;
			}

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
					scale: 1.1,
					opacity: pixelSize <= 1 ? 0 : 1,
				}}
				className="pixelOverlay"
			/>
			<img ref={imgRef} src={src} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
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
			image: overBeerPong,
		},
		{
			slug: "overbeerpong2",
			title: "Over Beer Pong 2",
			created: "2025",
			link: "/",
			image: overBeerPong,
		},
	];

	// Initialize pixel sizes for all projects
	const [pixelSizes, setPixelSizes] = useState(
		projects.reduce((acc, project) => {
			acc[project.slug] = 36;
			return acc;
		}, {})
	);

	const disapatePixels = (slug) => {
		// Clear any existing interval for this image
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
		// Clear the dissipation interval
		if (intervalsRef.current[slug]) {
			clearInterval(intervalsRef.current[slug]);
		}

		// Animate back to pixelated state
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

	// Cleanup intervals on unmount
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
				<div key={project.slug} className={`project ${project.slug}`} onMouseEnter={() => disapatePixels(project.slug)} onMouseLeave={() => rePixelate(project.slug)}>
					<PixelatedImage src={project.image} pixelSize={pixelSizes[project.slug]} />
				</div>
			))}
		</div>
	);
}
