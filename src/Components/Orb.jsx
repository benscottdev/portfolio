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
	const { setLoadingProgress, setIsLoaded } = useLoading();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		let assetsLoaded = false;
		let sceneReady = false;

		const checkIfReady = () => {
			if (assetsLoaded && sceneReady) {
				console.log("Everything ready, hiding loader");
				setTimeout(() => {
					setIsLoaded(true);
				}, 300);
			}
		};

		// Create LoadingManager to track all asset loading
		const loadingManager = new THREE.LoadingManager(
			// onLoad
			() => {
				console.log("Assets loaded!");
				assetsLoaded = true;
				setLoadingProgress(100);
				checkIfReady();
			},
			// onProgress
			(url, itemsLoaded, itemsTotal) => {
				const progress = Math.round((itemsLoaded / itemsTotal) * 100);
				console.log(`Loading: ${progress}%`);
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
			camera.position.set(0, 0, 4);
		} else {
			camera.position.set(0, 0, 6);
		}

		scene.add(camera);

		// Renderer with optimized settings
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
			powerPreference: "high-performance",
		});
		if (window.innerWidth > 2400) {
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.85));
		} else {
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		}
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

		// Load environment map
		async function loadEnvironment() {
			const pmremGenerator = new PMREMGenerator(renderer);
			pmremGenerator.compileEquirectangularShader();

			const hdrLoader = new HDRLoader(loadingManager);
			try {
				const hdrTexture = await hdrLoader.loadAsync("/oilslick.hdr");
				const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

				hdrTexture.dispose();
				pmremGenerator.dispose();

				scene.environment = envMap;
			} catch (error) {
				console.warn("HDR texture not found, using default environment");
			}
		}

		// Optimized materials (reused, not recreated)
		const customOrbMat = new THREE.MeshPhysicalMaterial({
			metalness: 0.9,
			roughness: 0,
			transmission: 1,
			thickness: 1,
			envMapIntensity: 1.0,
			clearcoat: 1.0,
			clearcoatRoughness: 0.1,
			ior: 3,
			reflectivity: 1.0,
			iridescence: 1.0,
			iridescenceIOR: 2.0,
			iridescenceThicknessRange: [50, 1200],
			color: 0xffffff,
		});

		// Orb Group for transforms
		let orb;
		const orbGroup = new THREE.Group();
		scene.add(orbGroup);

		// Load model
		const gltfLoader = new GLTFLoader(loadingManager);
		gltfLoader.load("/orb_shapekeyed.glb", (model) => {
			orb = model.scene;
			orb.scale.set(0.25, 0.25, 0.25);

			orb.traverse((child) => {
				if (child.isMesh) {
					child.material = customOrbMat;
					// Enable frustum culling
					child.frustumCulled = true;
					// Set morph target to 0 by default
					if (child.morphTargetInfluences) {
						child.morphTargetInfluences[0] = 0;
					}
				}
			});

			orbGroup.add(orb);
			orbRef.current = orb;
		});

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(1, 0, 4);
		scene.add(directionalLight);

		loadEnvironment();

		// Throttled mouse movement with GSAP
		const handleMouseMove = (e) => {
			if (!orbRef.current) return;

			const x = (e.clientX / window.innerWidth) * 2 - 1;
			const y = (e.clientY / window.innerHeight) * 2 - 1;

			if (!orbRef.current) return;

			// Normalized X (-1 to 1)
			const xNorm = (e.clientX / window.innerWidth) * 2 - 1;

			// Remap: middle = 0, sides = 1
			const morphTarget = Math.abs(xNorm); // 0 at center, 1 at sides

			orbRef.current.traverse((child) => {
				if (!child.isMesh) return;

				gsap.to(child.morphTargetInfluences, {
					0: morphTarget - 0.2,
					duration: 0.3,
					ease: "power2.out",
				});
			});
			// Kill previous animation to prevent stacking
			if (gsapAnimRef.current) {
				gsapAnimRef.current.kill();
			}

			gsapAnimRef.current = gsap.to(orbGroup.rotation, {
				x: y * 3,
				y: x * 3,
				duration: 2,
				ease: "power2.out",
			});
			gsapAnimRef.current = gsap.to(orbGroup.position, {
				x: x * 0.1,
				y: -y * 0.1,
				duration: 1,
				ease: "power2.out",
			});
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });

		// Optimized render loop
		let renderCount = 0;
		const tick = () => {
			renderer.render(scene, camera);
			animationRef.current = requestAnimationFrame(tick);

			// Mark scene as ready after enough frames have rendered
			if (renderCount === 30 && !sceneReady) {
				console.log("Scene rendered and ready");
				sceneReady = true;
				checkIfReady();
			}
			renderCount++;

			if (orb) {
				orb.rotation.z += 0.003;
				orb.rotation.y += 0.003;
			}
			scene.environmentRotation -= 0.03;
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
			}, 100);
		};

		window.addEventListener("resize", handleResize, { passive: true });

		// Cleanup
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", handleResize);

			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}

			if (gsapAnimRef.current) {
				gsapAnimRef.current.kill();
			}

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
			<canvas className="webgl" ref={canvasRef} style={{ display: "block" }} />
		</div>
	);
}

export default Orb;
