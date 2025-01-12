import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import PropTypes from "prop-types";

// Rotating shape animation in ASCII style
// Parameters: container width, container height (doesn't need to be square)
const AsciiAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let camera, controls, scene, renderer, effect;
        let shape;
        const start = Date.now();
        let frameRequest;

        function init() {
            const container = containerRef.current;

            // Camera setup
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            camera = new THREE.PerspectiveCamera(70, containerWidth / containerHeight, 0.1, 1000);
            camera.position.z = 3;

            // Scene setup
            scene = new THREE.Scene();

            // Lights
            const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
            directionalLight.position.set(2, 2, 2);
            scene.add(directionalLight);

            const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
            scene.add(ambientLight);

            // Shape setup
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            // const geometry = new THREE.TorusKnotGeometry(8, 2, 75, 20, 2, 3);

            const material = new THREE.MeshLambertMaterial({ color: "#f1f1f1", flatShading: true });
            shape = new THREE.Mesh(geometry, material);
            shape.scale.set(2.0, 2.0, 2.0); // Uniform scaling
            scene.add(shape);

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "low-power" });
            renderer.setPixelRatio(0.4);    // Lower for higher performance
            renderer.setSize(containerWidth, containerHeight);
            renderer.shadowMap.enabled = false; // Disable shadows

            // Maps the brightness of pixels to characters in the provided character set
            effect = new AsciiEffect(renderer, " .:-+*=%@#", {
                invert: true,
                resolution: 0.13,   // Lower for higher performance
            });
            effect.setSize(containerWidth, containerHeight);

            // Ensure effect.domElement is a valid Node
            if (effect.domElement instanceof Node) {
                container.appendChild(effect.domElement);
            } else {
                console.error("effect.domElement is not a valid DOM Node");
            }

            // TrackballControls for interaction
            controls = new TrackballControls(camera, effect.domElement);
            controls.enablePan = false;
            controls.rotateSpeed = 1.5; // How fast you can rotate shape with mouse
            controls.zoomSpeed = 3.0;   // How fast you zoom in and out
            controls.staticMoving = true; // Immediate responsiveness (true) or enable inertia (false).
            controls.dynamicDampingFactor = 0.3; // When staticMoving is false, controls the damping of the inertia effect

            window.addEventListener("resize", onWindowResize);
        }

        function onWindowResize() {
            const container = containerRef.current;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            camera.aspect = containerWidth / containerHeight; // Update aspect ratio
            camera.updateProjectionMatrix();

            renderer.setSize(containerWidth, containerHeight);
            effect.setSize(containerWidth, containerHeight);
        }

        function animate() {
            const elapsed = (Date.now() - start) / 1000;

            // Rotate the shape (adjust value to change rotation speed)
            shape.rotation.y = elapsed * Math.PI * 0.1;
            shape.rotation.z = elapsed * Math.PI * 0.1;

            controls.update();
            effect.render(scene, camera);
            frameRequest = requestAnimationFrame(animate);
        }

        init();
        frameRequest = requestAnimationFrame(animate);
        // renderer.setAnimationLoop(animate);

        return () => {
            if (containerRef.current) {
                while (containerRef.current.firstChild) {
                    containerRef.current.removeChild(containerRef.current.firstChild);
                }
            }
            window.removeEventListener("resize", onWindowResize);
            renderer.dispose();
            controls.dispose();
            cancelAnimationFrame(frameRequest);
        };

    }, []);

    return (
        <div
            ref={containerRef}
            id="ascii-shape"
            className="absolute top-0 right-10 w-50vw h-[30vh] lg:h-[40vh] 4xl:h-[30vh] 5xl:h-[25vh] z-10
                *:!cursor-none touch-pinch-zoom overflow-clip"
        />
    );
};

// PropTypes validation
AsciiAnimation.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
};

export default AsciiAnimation;
