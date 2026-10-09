import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Steam({ position, scale = 1 }) {
  const steamRef = useRef();

  useFrame((state) => {
    if (!steamRef.current) return;

    steamRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.08;

    steamRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
  });

  return (
    <mesh
      ref={steamRef}
      position={position}
      scale={scale}
    >
      <torusGeometry args={[0.16, 0.035, 16, 32]} />
      <meshStandardMaterial
        color="#F3E9DC"
        transparent
        opacity={0.22}
        roughness={1}
      />
    </mesh>
  );
}

function CoffeeBeans() {
  const beans = [
    [-1.9, -1.1, 0.2, 0.4],
    [1.8, -1.3, 0.1, -0.6],
    [1.9, -0.4, -0.4, 0.5],
  ];

  return (
    <>
      {beans.map(([x, y, z, rotation], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0.3, rotation, 0.5]}
          castShadow
        >
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color="#24150F"
            roughness={0.65}
          />
        </mesh>
      ))}
    </>
  );
}

function CoffeeCup() {
  return (
    <group rotation={[0, -0.35, 0]}>

      {/* Cup */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.55, 1.32, 1.8, 96]} />

        <meshStandardMaterial
          color="#4A2A1C"
          roughness={0.22}
          metalness={0.02}
        />
      </mesh>

      {/* Coffee */}
      <mesh
        position={[0, 0.92, 0]}
        receiveShadow
      >
        <cylinderGeometry args={[1.44, 1.44, 0.10, 96]} />

        <meshStandardMaterial
          color="#120906"
          roughness={0.12}
        />
      </mesh>

      {/* Latte / crema */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[1.30, 1.30, 0.025, 96]} />

        <meshStandardMaterial
          color="#7A5137"
          roughness={0.32}
        />
      </mesh>

      {/* Latte art center */}
      <mesh position={[0, 1.005, 0]}>
        <torusGeometry args={[0.48, 0.12, 24, 64]} />

        <meshStandardMaterial
          color="#D8B58E"
          roughness={0.4}
        />
      </mesh>

      {/* Handle */}
      <mesh
        position={[1.55, 0.05, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <torusGeometry args={[0.62, 0.17, 32, 64]} />

        <meshStandardMaterial
          color="#4A2A1C"
          roughness={0.22}
          metalness={0.02}
        />
      </mesh>

      {/* Cup base */}
      <mesh
        position={[0, -0.94, 0]}
        receiveShadow
      >
        <cylinderGeometry args={[1.30, 1.24, 0.12, 64]} />

        <meshStandardMaterial
          color="#2A170F"
          roughness={0.3}
        />
      </mesh>

      {/* Steam */}
      <Steam position={[-0.35, 1.45, 0]} scale={0.9} />
      <Steam position={[0.05, 1.55, 0.05]} scale={1.1} />
      <Steam position={[0.38, 1.42, 0]} scale={0.75} />

      {/* Beans */}
      <CoffeeBeans />

    </group>
  );
}

function Coffee3D() {
  return (
    <div className="h-[560px] w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [4.2, 2.8, 5.2],
          fov: 42,
        }}
      >

        {/* Natural café lighting */}
        <ambientLight intensity={1.15} />

        <directionalLight
          position={[4, 6, 4]}
          intensity={3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Warm side light */}
        <pointLight
          position={[-3, 2, 2]}
          intensity={1.5}
          color="#C58A5A"
        />

        {/* Soft cream front light */}
        <pointLight
          position={[2, 2, 5]}
          intensity={1.3}
          color="#F3E9DC"
        />

        <Float
          speed={1}
          rotationIntensity={0.08}
          floatIntensity={0.18}
        >
          <CoffeeCup />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
        />

      </Canvas>
    </div>
  );
}

export default Coffee3D;