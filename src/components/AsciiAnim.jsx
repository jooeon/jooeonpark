import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import PropTypes from "prop-types";

// Rotating cube animation in ASCII style
// Parameters: container width, container height (doesn't need to be square)
const AsciiAnimation = ({ width = "50rem", height = "50rem" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        let camera, controls, scene, renderer, effect;
        let cube;
        const start = Date.now();

        function init() {
            const container = containerRef.current;

            // Camera setup
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            camera = new THREE.PerspectiveCamera(70, containerWidth / containerHeight, 0.1, 1000);
            camera.position.z = 5;

            // Scene setup
            scene = new THREE.Scene();

            // Lights
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(2, 2, 2);
            scene.add(directionalLight);

            const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
            scene.add(ambientLight);

            // Cube setup
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshPhongMaterial({ color: "#f1f1f1" }); // customWhite
            cube = new THREE.Mesh(geometry, material);
            cube.scale.set(1.5, 1.5, 1.5); // Uniform scaling
            scene.add(cube);

            // Renderer and AsciiEffect
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(containerWidth, containerHeight);

            effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
            effect.setSize(containerWidth, containerHeight);
            // effect.domElement.style.backgroundColor = "#020202"; // background color

            // Ensure effect.domElement is a valid Node
            if (effect.domElement instanceof Node) {
                container.appendChild(effect.domElement);
            } else {
                console.error("effect.domElement is not a valid DOM Node");
            }

            // TrackballControls for interaction
            controls = new TrackballControls(camera, effect.domElement);
            controls.rotateSpeed = 2.0; // how fast you can rotate cube with mouse
            controls.zoomSpeed = 5.0;   // how fast you zoom in and out
            controls.panSpeed = 0.8;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;

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

            // Rotate the cube (adjust value to change rotation speed)
            cube.rotation.y = elapsed * Math.PI * 0.2;
            cube.rotation.z = elapsed * Math.PI * 0.2;

            controls.update();
            effect.render(scene, camera);
        }

        init();

        renderer.setAnimationLoop(animate);

        return () => {
            if (containerRef.current) {
                while (containerRef.current.firstChild) {
                    containerRef.current.removeChild(containerRef.current.firstChild);
                }
            }
            window.removeEventListener("resize", onWindowResize);
            renderer.dispose();
            controls.dispose();
        };

    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width, height }}
            id="ascii-cube"
            className="absolute top-0 right-0 *:!cursor-none"
        />
    );
};

// PropTypes validation
AsciiAnimation.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
};

export default AsciiAnimation;
