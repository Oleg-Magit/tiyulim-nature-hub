import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// Tree component
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle sway animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.02;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 3, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      {/* Leaves - multiple layers for depth */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <group ref={groupRef}>
          <mesh position={[0, 4, 0]}>
            <coneGeometry args={[1.2, 2.5, 8]} />
            <meshStandardMaterial color="#1a472a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 5, 0]}>
            <coneGeometry args={[0.9, 2, 8]} />
            <meshStandardMaterial color="#2d5a3a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 5.8, 0]}>
            <coneGeometry args={[0.6, 1.5, 8]} />
            <meshStandardMaterial color="#3d6b4a" roughness={0.8} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// Ground with grass texture
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#2a4a32" roughness={1} />
    </mesh>
  );
}

// Particles for atmosphere (fireflies/dust)
function Particles({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 10 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffeed4" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

// Light rays through the trees
function LightRays() {
  return (
    <group>
      <spotLight
        position={[10, 15, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#fff5e0"
        castShadow
      />
      <spotLight
        position={[-8, 12, -3]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        color="#ffe4b3"
      />
    </group>
  );
}

// Camera controller for subtle movement
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.1;
    state.camera.position.x = Math.sin(t) * 0.5;
    state.camera.position.y = 3 + Math.sin(t * 0.5) * 0.2;
    state.camera.lookAt(0, 3, -5);
  });
  return null;
}

// Main forest scene
function ForestScene() {
  // Generate random tree positions
  const trees = useMemo(() => {
    const result: { position: [number, number, number]; scale: number }[] = [];
    
    // Back row - far trees
    for (let i = 0; i < 15; i++) {
      result.push({
        position: [(Math.random() - 0.5) * 40, 0, -15 - Math.random() * 10],
        scale: 0.8 + Math.random() * 0.4,
      });
    }
    
    // Middle row
    for (let i = 0; i < 10; i++) {
      result.push({
        position: [(Math.random() - 0.5) * 30, 0, -8 - Math.random() * 5],
        scale: 1 + Math.random() * 0.5,
      });
    }
    
    // Front row - close trees (sides only to frame the view)
    result.push({ position: [-8, 0, -3], scale: 1.3 });
    result.push({ position: [8, 0, -4], scale: 1.2 });
    result.push({ position: [-6, 0, -5], scale: 1.1 });
    result.push({ position: [7, 0, -6], scale: 1.4 });
    result.push({ position: [-10, 0, -2], scale: 1.5 });
    result.push({ position: [10, 0, -3], scale: 1.3 });
    
    return result;
  }, []);

  return (
    <>
      <CameraRig />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#4a6741" />
      
      {/* Light rays */}
      <LightRays />
      
      {/* Fog for depth - using Three.js native fog */}
      <fog attach="fog" args={["#1a2f1c", 5, 35]} />
      
      {/* Environment for reflections */}
      <Environment preset="forest" />
      
      {/* Ground */}
      <Ground />
      
      {/* Trees */}
      {trees.map((tree, i) => (
        <Tree key={i} position={tree.position} scale={tree.scale} />
      ))}
      
      {/* Atmospheric particles */}
      <Particles count={150} />
    </>
  );
}

export const Forest3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 60 }}
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
      >
        <ForestScene />
      </Canvas>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/30 pointer-events-none" />
    </div>
  );
};
