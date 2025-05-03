import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";

const RotatingTorus = () => {
    const torus = useRef(null);

    // Rotation logic in the render loop
    useFrame(() => {
        if (torus.current) {
            torus.current.rotation.x += 0.001;
            torus.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={torus}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <torusKnotGeometry args={[0.8, 0.2, 100, 10, 2, 3]} />
            <MeshTransmissionMaterial
                thickness={0.2}
                roughness={0}
                transmission={1}
                ior={1.2}
                chromaticAberration={0.02}
                backside={true}
            />
        </mesh>
    );
};

const TransmissionModel = () => {
    return (
        <div
            id="ascii-shape"
            className="absolute top-0 right-10 w-50vw h-[30vh] lg:h-[40vh] 4xl:h-[30vh] 5xl:h-[25vh] z-10
                *:!cursor-none touch-pinch-zoom overflow-clip"
        >
            <Canvas
                camera={{
                    position: [0, 0, 1], // Set camera position to view the object
                    fov: 30,
                }}
            >
                {/*<directionalLight position={[0, 3, 2]} intensity={3} />*/}
                {/*<Environment preset="night" />*/}
                <group scale={1}>
                    <Text
                        font="fonts/Outfit-Regular.ttf"
                        position={[0, 0, -0.5]}
                        fontSize={0.15}
                        color="#66ffcf"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Digital Experiences
                    </Text>
                    <RotatingTorus />
                </group>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default TransmissionModel;
