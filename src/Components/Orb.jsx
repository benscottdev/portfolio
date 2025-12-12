import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { PMREMGenerator } from "three";
import gsap from "gsap";

function Orb() {
	const canvasRef = useRef();
	const sceneRef = useRef(new THREE.Scene());
	const cameraRef = useRef(new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 1000));

	useEffect(() => {
		const canvas = canvasRef.current;
		sceneRef.current = new THREE.Scene();
		const scene = sceneRef.current;
		const camera = cameraRef.current;

		// Window sizes
		let sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// Camera options
		camera.position.set(0, 0, 4);
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();
		scene.add(camera);

		const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);

		/**
		 * Loaders
		 */
		// HDRI Loader
		async function loadEnvironment(renderer, scene) {
			const pmremGenerator = new PMREMGenerator(renderer);
			pmremGenerator.compileEquirectangularShader();

			const hdrLoader = new RGBELoader();
			const hdrTexture = await hdrLoader.loadAsync("/oilslick.hdr");

			const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

			hdrTexture.dispose();
			pmremGenerator.dispose();

			scene.environment = envMap;
		}

		// GLTF Loader
		const gltfLoader = new GLTFLoader();

		// Materials
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
		});

		const glassMat = new THREE.MeshPhysicalMaterial({
			metalness: 0,
			roughness: 0,
			transmission: 1,
			thickness: 0,
			envMapIntensity: 3.0,
			clearcoat: 1.0,
			clearcoatRoughness: 0.1,
			ior: 2.3,
		});

		/**
		 * Models
		 */

		let orbExternalModel;

		gltfLoader.load("/starorb2.glb", (model) => {
			orbExternalModel = model.scene;
			orbExternalModel.scale.set(0.25, 0.25, 0.25);

			orbExternalModel.traverse((child) => {
				if (child.isMesh) {
					child.material = customOrbMat;
					child.material.color.set("white");
				}
			});
			scene.add(orbExternalModel);
		});

		// TestPlane
		const planeGeometry = new THREE.PlaneGeometry(10, 10);
		const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
		planeMesh.position.set(0, 0, -4);
		// scene.add(planeMesh);

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0);
		scene.add(ambientLight);

		const directionalLightOne = new THREE.DirectionalLight(0xffffff, 1);
		directionalLightOne.position.set(1, 0, 4);
		scene.add(directionalLightOne);

		/**
		 * MouseMovement Event
		 */

		const cursorLocation = {
			x: 0,
			y: 0,
		};

		window.addEventListener("mousemove", (e) => {
			cursorLocation.x = (e.clientX / sizes.width) * 2 - 1;
			cursorLocation.y = (e.clientY / sizes.height) * 2 - 1;

			gsap.to(orbExternalModel.rotation, {
				x: cursorLocation.y * 3,
				y: cursorLocation.x * 3,
				duration: 4,
			});
		});

		// Render options
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		renderer.setSize(sizes.width, sizes.height);
		renderer.outputEncoding = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

		loadEnvironment(renderer, scene);

		// Animation function
		let animationFrameId;
		const tick = () => {
			renderer.render(scene, camera);
			camera.updateProjectionMatrix();
			animationFrameId = requestAnimationFrame(tick);
		};
		tick();

		// Handle resize function
		const handleResize = () => {
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;
			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();
			renderer.setSize(sizes.width, sizes.height);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div>
			<canvas ref={canvasRef} className="webgl"></canvas>
		</div>
	);
}

export default Orb;
