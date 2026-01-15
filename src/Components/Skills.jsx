import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

function Skills() {
	const sceneRef = useRef(null);
	const engineRef = useRef(null);
	const renderRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	// ====== EASY SIZING CONTROLS ======
	// Adjust these values to scale text and pills together
	// fontSize: Text size inside pills
	// pillHeight: Height of each pill
	// paddingX: Space on left/right of text (makes pills wider)
	const SIZING = {
		desktop: {
			fontSize: 48,
			pillHeight: 70,
			paddingX: 60,
		},
		tablet: {
			fontSize: 20,
			pillHeight: 45,
			paddingX: 50,
		},
		mobile: {
			fontSize: 16,
			pillHeight: 40,
			paddingX: 40,
		},
	};
	// ===================================

	const skillsArray = [
		{ skillName: "REACT JS", skillTypes: ["development"], color: "#2d2d2d" },
		{ skillName: "JAVASCRIPT", skillTypes: ["development"], color: "#505050" },
		{ skillName: "HTML", skillTypes: ["development"], color: "#242424" },
		{ skillName: "CSS", skillTypes: ["development"], color: "#2d2d2d" },
		{ skillName: "THREE.JS", skillTypes: ["development", "3D"], color: "#242424" },
		{ skillName: "SQL", skillTypes: ["development"], color: "#3f3f3f" },
		{ skillName: "GSAP", skillTypes: ["development"], color: "#242424" },
		{ skillName: "PHP", skillTypes: ["development"], color: "#2d2d2d" },
		{ skillName: "WORDPRESS", skillTypes: ["development"], color: "#3f3f3f" },
		{ skillName: "C#", skillTypes: ["development"], color: "#505050" },
		{ skillName: "UNITY", skillTypes: ["development", "3D"], color: "#2d2d2d" },
		{ skillName: "BLENDER", skillTypes: ["3D"], color: "#3f3f3f" },
		{ skillName: "AFTER EFFECTS", skillTypes: ["3D"], color: "#2d2d2d" },
		{ skillName: "FIGMA", skillTypes: ["design"], color: "#3f3f3f" },
		{ skillName: "PHOTOSHOP", skillTypes: ["design"], color: "#2d2d2d" },
		{ skillName: "ILLUSTRATOR", skillTypes: ["design"], color: "#505050" },
		{ skillName: "REACT NATIVE", skillTypes: ["development"], color: "#505050" },
	];

	useEffect(() => {
		const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint, Events } = Matter;

		// Create engine
		const engine = Engine.create({
			gravity: { x: 0, y: 1.25 },
		});
		engineRef.current = engine;

		// Get container dimensions
		const container = sceneRef.current;
		const width = container.clientWidth;
		const height = container.clientHeight || 300;

		// Get device pixel ratio for sharp rendering
		const pixelRatio = window.devicePixelRatio || 2;

		// Create renderer
		const render = Render.create({
			element: container,
			engine: engine,
			options: {
				width: width,
				height: height,
				wireframes: false,
				background: "transparent",
				pixelRatio: pixelRatio,
			},
		});
		renderRef.current = render;

		// Scale canvas for high DPI displays
		render.canvas.style.width = width + "px";
		render.canvas.style.height = height + "px";

		// Create boundaries (all four sides) - thick walls to prevent escaping
		const thickness = 200; // Increased from 50 to prevent pills escaping
		const boundaries = [
			// Bottom
			Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
				isStatic: true,
				render: { fillStyle: "transparent" },
			}),
			// Top
			Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
				isStatic: true,
				render: { fillStyle: "transparent" },
			}),
			// Left
			Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
				isStatic: true,
				render: { fillStyle: "transparent" },
			}),
			// Right
			Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, {
				isStatic: true,
				render: { fillStyle: "transparent" },
			}),
		];

		// Get current sizing based on viewport width
		const currentSize = width < 480 ? SIZING.mobile : width < 1300 ? SIZING.tablet : SIZING.desktop;

		// Measure text to size pills correctly
		const tempCanvas = document.createElement("canvas");
		const tempContext = tempCanvas.getContext("2d");
		tempContext.font = `normal ${currentSize.fontSize}px Feature Mono, sans-serif`;

		// Create skill bubbles (pill-shaped) with proper text sizing
		const bubbles = skillsArray.map((skill, index) => {
			// Measure text width
			const textWidth = tempContext.measureText(skill.skillName).width;
			const pillWidth = textWidth + currentSize.paddingX;
			const pillHeight = currentSize.pillHeight;

			// Random starting position near the top
			const x = pillWidth + Math.random() * (width - pillWidth * 2);
			const y = 100 + Math.random() * 100;

			const bubble = Bodies.rectangle(x, y, pillWidth, pillHeight, {
				restitution: 0.6,
				friction: 1,
				density: 1,
				// chamfer: { radius: 15 }, // Makes it pill-shaped
				render: {
					fillStyle: skill.color,
					strokeStyle: "#fff",
					lineWidth: 0,
				},
				label: skill.skillName,
			});

			return bubble;
		});

		// Add all bodies to the world
		World.add(engine.world, [...boundaries, ...bubbles]);

		// Create mouse control with limited throwing power
		const mouse = Mouse.create(render.canvas);
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: { visible: false },
			},
		});

		World.add(engine.world, mouseConstraint);

		// Limit maximum velocity to prevent pills escaping
		Events.on(engine, "beforeUpdate", () => {
			const maxSpeed = 20;
			bubbles.forEach((bubble) => {
				const speed = Math.sqrt(bubble.velocity.x ** 2 + bubble.velocity.y ** 2);
				if (speed > maxSpeed) {
					const scale = maxSpeed / speed;
					Matter.Body.setVelocity(bubble, {
						x: bubble.velocity.x * scale,
						y: bubble.velocity.y * scale,
					});
				}
			});
		});

		// Track dragging state
		Events.on(mouseConstraint, "startdrag", () => {
			setIsDragging(true);
			// Prevent scrolling only when actively dragging
			document.body.style.overflow = "hidden";
		});

		Events.on(mouseConstraint, "enddrag", () => {
			setIsDragging(false);
			// Re-enable scrolling when not dragging
			document.body.style.overflow = "";
		});

		// Keep the mouse in sync with rendering
		render.mouse = mouse;

		// Override mouse element's event listeners to allow scroll when not dragging
		mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
		mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

		// Re-enable touch events with proper handling for mobile
		mouse.element.addEventListener("touchstart", mouse.mousedown, { passive: false });
		mouse.element.addEventListener("touchmove", mouse.mousemove, { passive: false });
		mouse.element.addEventListener("touchend", mouse.mouseup, { passive: false });

		// Run the engine and renderer
		const runner = Runner.create();
		Runner.run(runner, engine);
		Render.run(render);

		// Render labels on canvas
		const renderLabels = () => {
			const context = render.canvas.getContext("2d");
			// Get current sizing for text rendering
			const renderSize = width < 480 ? SIZING.mobile : width < 1300 ? SIZING.tablet : SIZING.desktop;

			bubbles.forEach((bubble) => {
				context.save();
				// Matter.js Render with pixelRatio already scales the context
				// so we use the logical coordinates directly
				context.translate(bubble.position.x, bubble.position.y);
				context.rotate(bubble.angle);
				context.textAlign = "center";
				context.textBaseline = "middle";

				// Add shadow for better readability
				context.shadowColor = "rgba(0, 0, 0, 0.3)";
				context.shadowBlur = 2;

				context.fillStyle = "#fff";
				context.font = `normal ${renderSize.fontSize}px Feature Mono, sans-serif`;
				context.fillText(bubble.label, 0, 0);
				context.restore();
			});
		};

		Events.on(render, "afterRender", renderLabels);

		// Handle window resize
		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const newWidth = container.clientWidth;
				const newHeight = container.clientHeight || 600;

				// Update canvas size
				render.canvas.width = newWidth * pixelRatio;
				render.canvas.height = newHeight * pixelRatio;
				render.canvas.style.width = newWidth + "px";
				render.canvas.style.height = newHeight + "px";
				render.options.width = newWidth;
				render.options.height = newHeight;

				// Update boundaries
				const widthScale = newWidth / width;
				const heightScale = newHeight / height;

				// Remove old boundaries
				World.remove(engine.world, boundaries);

				// Create new boundaries
				boundaries[0] = Bodies.rectangle(newWidth / 2, newHeight + thickness / 2, newWidth, thickness, {
					isStatic: true,
					render: { fillStyle: "transparent" },
				});
				boundaries[1] = Bodies.rectangle(newWidth / 2, -thickness / 2, newWidth, thickness, {
					isStatic: true,
					render: { fillStyle: "transparent" },
				});
				boundaries[2] = Bodies.rectangle(-thickness / 2, newHeight / 2, thickness, newHeight, {
					isStatic: true,
					render: { fillStyle: "transparent" },
				});
				boundaries[3] = Bodies.rectangle(newWidth + thickness / 2, newHeight / 2, thickness, newHeight, {
					isStatic: true,
					render: { fillStyle: "transparent" },
				});

				World.add(engine.world, boundaries);

				// Reposition bubbles proportionally
				bubbles.forEach((bubble) => {
					const newX = bubble.position.x * widthScale;
					const newY = bubble.position.y * heightScale;
					Matter.Body.setPosition(bubble, { x: newX, y: newY });
				});
			}, 100);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			clearTimeout(resizeTimeout);
			document.body.style.overflow = ""; // Restore scrolling
			window.removeEventListener("resize", handleResize);
			mouse.element.removeEventListener("touchstart", mouse.mousedown);
			mouse.element.removeEventListener("touchmove", mouse.mousemove);
			mouse.element.removeEventListener("touchend", mouse.mouseup);
			Events.off(mouseConstraint, "startdrag");
			Events.off(mouseConstraint, "enddrag");
			Events.off(render, "afterRender", renderLabels);
			Render.stop(render);
			Runner.stop(runner);
			World.clear(engine.world);
			Engine.clear(engine);
			render.canvas.remove();
			render.textures = {};
		};
	}, []);

	return (
		<div className="skills">
			<div ref={sceneRef} className="skills-canvas-container" style={{ cursor: isDragging ? "grabbing" : "grab" }} />
		</div>
	);
}

export default Skills;
