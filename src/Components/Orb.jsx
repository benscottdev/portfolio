import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { PMREMGenerator } from "three";
import gsap from "gsap";
import { useLoading } from "../contexts/LoadingContext";

function Orb() {
	const canvasRef = useRef();
	const orbRef = useRef(null);

	const animationRef = useRef(null);
	const gsapAnimRef = useRef(null);
	const needsRender = useRef(true);
	const meshCache = useRef([]);
	const isVisible = useRef(true);
	const lastMouseMove = useRef(0);
	const { setLoadingProgress, setIsLoaded } = useLoading();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		let assetsLoaded = false;
		let sceneReady = false;

		const checkIfReady = () => {
			if (assetsLoaded && sceneReady) {
				// console.log("Everything ready, hiding loader");
				setTimeout(() => {
					setIsLoaded(true);
				}, 300);
			}
		};

		// Create LoadingManager to track all asset loading
		const loadingManager = new THREE.LoadingManager(
			// onLoad
			() => {
				// console.log("Assets loaded!");
				assetsLoaded = true;
				setLoadingProgress(100);
				checkIfReady();
			},
			// onProgress
			(url, itemsLoaded, itemsTotal) => {
				const progress = Math.round((itemsLoaded / itemsTotal) * 100);
				// console.log(`Loading: ${progress}%`);
				setLoadingProgress(progress);
			},
			// onError
			(url) => {
				console.warn(`Error loading: ${url}`);
			}
		);

		// Initialize scene and camera once
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 1000);

		if (window.innerWidth > 1000) {
			camera.position.set(0, 0, 5.5);
		} else {
			camera.position.set(0, 0, 7);
		}
		camera.lookAt(0, 0, 0)
		scene.add(camera);

		// Renderer with optimized settings
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
			powerPreference: "high-performance",
		});
		// Optimize pixel ratio based on screen size
		if (window.innerWidth > 2400) {
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		} else if (window.innerWidth > 1000) {
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		} else {
			// Mobile: lower pixel ratio for better performance
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		}
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

		// Force initial render to establish proper positioning
		renderer.render(scene, camera);

		// Load environment map
		async function loadEnvironment() {
			const pmremGenerator = new PMREMGenerator(renderer);
			pmremGenerator.compileEquirectangularShader();

			const hdrLoader = new HDRLoader(loadingManager);
			try {
				const hdrTexture = await hdrLoader.loadAsync("/oilslick_dark_green.hdr");
				const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

				hdrTexture.dispose();
				pmremGenerator.dispose();
				scene.environment = envMap
			} catch (error) {
				console.warn("HDR texture not found, using default environment");
			}
		}


		const chromeMat = new THREE.MeshPhysicalMaterial({
			metalness: 1,
			transmission: 1,
			thickness: 1,
			roughness: 0,
			ior: 3,
			envMapIntensity: 1.2,
		});

		// const bgPlaneGeom = new THREE.PlaneGeometry(20, 20)
		// const bgPlaneMat = new THREE.MeshBasicMaterial({ color: 0x1b1b1b });
		// const bgMesh = new THREE.Mesh(bgPlaneGeom, bgPlaneMat)
		// bgMesh.position.set(0, 0, -2)
		// scene.add(bgMesh)

		// Orb Group for transforms
		let orb;
		const orbGroup = new THREE.Group();
		scene.add(orbGroup);

		// Load model
		const gltfLoader = new GLTFLoader(loadingManager);
		gltfLoader.load("/Orb1.glb", (model) => {
			orb = model.scene;
			orb.scale.set(1, 1, 1);
			orb.rotation.y = Math.PI / 2;

			orb.traverse((child) => {
				if (child.isMesh) {
					child.material = chromeMat;
					child.frustumCulled = true;
					if (child.morphTargetInfluences) {
						child.morphTargetInfluences[0] = 0;
						meshCache.current.push(child);
					}
				}
			});

			orbGroup.add(orb);
			orbRef.current = orb;
			needsRender.current = true;
		});



		const orbLight2 = new THREE.DirectionalLight(0xffffff, 1000)
		orbLight2.position.set(0, 1, 1)
		const orbLightHelper2 = new THREE.DirectionalLightHelper(orbLight2)
		// scene.add(orbLightHelper2)
		scene.add(orbLight2)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
		directionalLight.position.set(1, 0, 4);
		scene.add(directionalLight);

		loadEnvironment();

		// Throttled pointer movement with GSAP
		const handlePointerMove = (e) => {
			if (!camera) return;

			// Throttle to max 60fps (16ms)
			const now = performance.now();
			if (now - lastMouseMove.current < 16) return;
			lastMouseMove.current = now;

			const x = (e.clientX / window.innerWidth) * 2 - 1;
			const y = (e.clientY / window.innerHeight) * 2 - 1;

			// Remap: middle = 0, sides = 1
			const morphTarget = Math.abs(x); // 0 at center, 1 at sides

			// Use cached meshes instead of traversing
			meshCache.current.forEach((mesh) => {
				gsap.to(mesh.morphTargetInfluences, {
					0: morphTarget - 0.1,
					duration: 0.3,
					ease: "power2.out",
					onUpdate: () => {
						needsRender.current = true;
					},
				});
			});

			// Kill previous animation to prevent stacking
			if (gsapAnimRef.current) {
				gsapAnimRef.current.kill();
			}

			// Combine both animations into a single timeline for better performance
			gsapAnimRef.current = gsap.timeline({
				onUpdate: () => {
					needsRender.current = true;
				},
			});

			gsapAnimRef.current
				.to(
					orbGroup.rotation,
					{
						x: y * 6,
						y: x * 6,
						duration: 2,
						ease: "power2.out",
					},
					0
				)
			gsapAnimRef.current
				.to(
					orbGroup.position,
					{
						x: x * 0.1,
						y: -y * 0.1,
						duration: 0.5,
						ease: "power2.out",
					},
					0
				)

		};

		window.addEventListener("pointermove", handlePointerMove, { passive: true });

		// Visibility detection for performance
		const handleVisibilityChange = () => {
			isVisible.current = !document.hidden;
			if (isVisible.current) {
				needsRender.current = true;
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Optimized render loop with on-demand rendering
		let renderCount = 0;
		let frameCount = 0;
		const tick = () => {
			animationRef.current = requestAnimationFrame(tick);

			// Only render when necessary and tab is visible
			if (!isVisible.current) return;

			// Always render during initial setup
			const shouldRender = renderCount < 30 || needsRender.current;

			if (shouldRender) {
				renderer.render(scene, camera);
				needsRender.current = false;
			}

			// Mark scene as ready after enough frames have rendered
			if (renderCount === 30 && !sceneReady) {
				// console.log("Scene rendered and ready");
				sceneReady = true;
				checkIfReady();
			}
			renderCount++;

			// Continuous rotation and environment updates
			if (orb) {
				orb.rotation.z += 0.007;
				orb.rotation.y += 0.007;
				needsRender.current = true;
			}

			// Update environment rotation every 2 frames instead of every frame
			if (frameCount % 2 === 0) {
				scene.environmentRotation -= 0.03;
			}
			frameCount++;
		};
		tick();

		// Efficient resize handler
		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize(width, height);
				needsRender.current = true;
			}, 100);
		};

		window.addEventListener("resize", handleResize, { passive: true });

		// Cleanup
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("visibilitychange", handleVisibilityChange);

			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}

			if (gsapAnimRef.current) {
				gsapAnimRef.current.kill();
			}

			// Clear cached meshes
			meshCache.current = [];

			// Dispose of Three.js resources
			scene.traverse((object) => {
				if (object.geometry) object.geometry.dispose();
				if (object.material) {
					if (Array.isArray(object.material)) {
						object.material.forEach((mat) => mat.dispose());
					} else {
						object.material.dispose();
					}
				}
			});

			renderer.dispose();
		};
	}, []);

	return (
		<div style={{ width: "100dvw", height: "100dvh", overflow: "hidden" }}>
			<canvas className="webgl orbScene" ref={canvasRef} style={{ display: "block" }} />
		</div>
	);
}

export default Orb;
