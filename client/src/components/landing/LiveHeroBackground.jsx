import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, SoftShadows, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import FurnitureModel from '../universe/FurnitureModel';

function RotatingRoom() {
  const groupRef = useRef();

  // Slowly rotate the entire room
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Mock items for the hero scene
  const sofa = { id: 'prod-003', color: '#0057FE', dimensions: { width: 2, height: 0.8, depth: 0.9 } }; // Brand blue sofa
  const table = { id: 'prod-004', color: '#FFFFFF', dimensions: { width: 1.2, height: 0.45, depth: 0.6 } };
  const lamp = { id: 'prod-005', color: '#4A11C0', dimensions: { width: 0.4, height: 1.8, depth: 0.4 } };
  const plant = { id: 'prod-014', color: '#0F9D6E', dimensions: { width: 0.6, height: 1.2, depth: 0.6 } };

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#EDEAE2" roughness={0.8} />
      </mesh>

      {/* Back Wall */}
      <mesh receiveShadow position={[0, 2.5, -4]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
      
      {/* Side Wall */}
      <mesh receiveShadow position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#F7F5F0" roughness={0.9} />
      </mesh>

      {/* Furniture Arrangement */}
      <group position={[0, 0, 0]}>
        {/* Sofa */}
        <group position={[0, 0, -1]}>
          <FurnitureModel item={sofa} />
        </group>
        
        {/* Coffee Table */}
        <group position={[0, 0, 0.5]}>
          <FurnitureModel item={table} />
        </group>

        {/* Floor Lamp */}
        <group position={[-1.5, 0, -1.2]}>
          <FurnitureModel item={lamp} />
        </group>

        {/* Potted Plant */}
        <group position={[1.8, 0, -1]}>
          <FurnitureModel item={plant} />
        </group>
      </group>
    </group>
  );
}

export default function LiveHeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [3, 2, 4], fov: 45 }}>
        <color attach="background" args={['#F7F5F0']} />
        
        {/* Soft, beautiful daylight lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight
          castShadow
          position={[5, 8, 5]}
          intensity={2.0}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5]} />
        </directionalLight>
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#0057FE" />
        
        <SoftShadows size={15} samples={10} focus={0.5} />
        <Environment preset="city" />

        <RotatingRoom />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} target={[0, 1, 0]} />
        <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
