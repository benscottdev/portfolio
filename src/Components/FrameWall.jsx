import React, { useEffect, useRef } from 'react'

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { PMREMGenerator } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function FrameWall() {
    const canvasRef = useRef();

    const projects = [
        {
            slug: "confirmed",
            title: "Confirmed",
            created: "2026",
            link: "",
            // image: confirmedAppImage,
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
            // image: dextersBookCo,
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
            // image: overBeerPongImage,
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
            // image: songWorksImage,
            type: "Website",
            tech: "React",
            status: "Completed",
            description: "Modern website for SongWorks music studio showcasing services, portfolio, and booking system. Built with React for smooth interactions and responsive design.",
        },

    ];


    useEffect(() => {

        let sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        /**
         * ESSENTIALS
         */
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.01, 1000);
        camera.position.set(0, 0, 12);
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });

        // Orbit Controls - Disabled
        // const controls = new OrbitControls(camera, canvas);
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.05;
        // controls.minDistance = 5;
        // controls.maxDistance = 20;
        // controls.target.set(0, 0, 0);

        if (window.innerWidth > 2400) {
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        } else if (window.innerWidth > 1000) {
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } else {
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        renderer.render(scene, camera);

        /**
         * LIGHTS
         */

        const ab = new THREE.AmbientLight({ color: 0xfffff }, 5)
        // scene.add(ab)

        const dl1 = new THREE.DirectionalLight({ color: 0xfff }, 4)
        dl1.position.set(0, 2, 1)
        scene.add(dl1)


        /**
         * LOADERS
         */

        const gltfLoader = new GLTFLoader()



        /**
         * MESHES
         */
        const sceneGroup = new THREE.Group;
        scene.add(sceneGroup)



        const columns = 2;
        const rows = Math.ceil(projects.length / columns); // Calculate rows needed
        const spacingX = 4.5; // Horizontal spacing between frames
        const spacingY = 3.5; // Vertical spacing between frames

        projects.forEach((item, index) => {
            gltfLoader.load('/WebsiteFrame.glb', (gltf) => {
                const frame = gltf.scene;
                frame.scale.set(1, 1, 1);

                // Calculate grid position for this index
                const col = index % columns; // Column index (0, 1)
                const row = Math.floor(index / columns); // Row index (0, 1, 2, ...)

                // Center the grid by offsetting based on total dimensions
                const offsetX = (columns - 1) * spacingX / 2;
                const offsetY = (rows - 1) * spacingY / 2;

                // Position frame in grid
                frame.position.set(
                    col * spacingX - offsetX,
                    offsetY - row * spacingY,
                    0
                );

                sceneGroup.add(frame);
            });
        })




        /**
         * ANIMATE
         */
        let animationFrameId;
        let resizeTimeout;
        const tick = () => {
            // controls.update();
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(tick);
        }
        tick();


        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();
                renderer.setSize(sizes.width, sizes.height);
            }, 100);
        };
        window.addEventListener("resize", handleResize, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            // controls.dispose();
        };

    }, [])

    return (
        <div>
            <canvas className="webgl frameWall" ref={canvasRef} style={{ display: "block" }} />
        </div>
    )
}

export default FrameWall