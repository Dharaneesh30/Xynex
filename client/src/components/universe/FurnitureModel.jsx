import React from 'react';
import * as THREE from 'three';

export default function FurnitureModel({ item }) {
  const { id, color, dimensions } = item;
  const w = dimensions.width;
  const h = dimensions.height;
  const d = dimensions.depth;
  
  // Generic materials
  const mainMat = <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />;
  const darkMat = <meshStandardMaterial color="#222222" roughness={0.8} />;
  const woodMat = <meshStandardMaterial color="#8b5a2b" roughness={0.9} />;

  if (id === 'prod-001' || id === 'prod-004' || id === 'prod-009') {
    // Desk, Coffee Table, or Dining Table
    const legW = 0.05;
    return (
      <group>
        {/* Top */}
        <mesh position={[0, h - 0.05/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.05, d]} />
          {mainMat}
        </mesh>
        {/* Legs */}
        <mesh position={[-w/2 + legW, h/2 - 0.025, -d/2 + legW]} castShadow receiveShadow>
          <boxGeometry args={[legW, h - 0.05, legW]} />
          {darkMat}
        </mesh>
        <mesh position={[w/2 - legW, h/2 - 0.025, -d/2 + legW]} castShadow receiveShadow>
          <boxGeometry args={[legW, h - 0.05, legW]} />
          {darkMat}
        </mesh>
        <mesh position={[-w/2 + legW, h/2 - 0.025, d/2 - legW]} castShadow receiveShadow>
          <boxGeometry args={[legW, h - 0.05, legW]} />
          {darkMat}
        </mesh>
        <mesh position={[w/2 - legW, h/2 - 0.025, d/2 - legW]} castShadow receiveShadow>
          <boxGeometry args={[legW, h - 0.05, legW]} />
          {darkMat}
        </mesh>
      </group>
    );
  }

  if (id === 'prod-002' || id === 'prod-010') {
    // Office Chair or Dining Chair
    const seatH = 0.45;
    return (
      <group>
        {/* Seat */}
        <mesh position={[0, seatH, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.1, d]} />
          {mainMat}
        </mesh>
        {/* Backrest */}
        <mesh position={[0, seatH + (h - seatH)/2 + 0.05, -d/2 + 0.05]} castShadow receiveShadow>
          <boxGeometry args={[w, h - seatH, 0.1]} />
          {mainMat}
        </mesh>
        {id === 'prod-002' ? (
          <>
            {/* Center column */}
            <mesh position={[0, seatH/2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.05, 0.05, seatH]} />
              {darkMat}
            </mesh>
            {/* Base star */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[w/2, w/2, 0.1, 5]} />
              {darkMat}
            </mesh>
          </>
        ) : (
          <>
            {/* 4 simple legs */}
            <mesh position={[-w/2 + 0.05, seatH/2, -d/2 + 0.05]} castShadow receiveShadow><cylinderGeometry args={[0.03, 0.03, seatH]}/>{darkMat}</mesh>
            <mesh position={[w/2 - 0.05, seatH/2, -d/2 + 0.05]} castShadow receiveShadow><cylinderGeometry args={[0.03, 0.03, seatH]}/>{darkMat}</mesh>
            <mesh position={[-w/2 + 0.05, seatH/2, d/2 - 0.05]} castShadow receiveShadow><cylinderGeometry args={[0.03, 0.03, seatH]}/>{darkMat}</mesh>
            <mesh position={[w/2 - 0.05, seatH/2, d/2 - 0.05]} castShadow receiveShadow><cylinderGeometry args={[0.03, 0.03, seatH]}/>{darkMat}</mesh>
          </>
        )}
      </group>
    );
  }

  if (id === 'prod-003' || id === 'prod-016') {
    // Sofa or Armchair
    const seatH = 0.4;
    return (
      <group>
        {/* Seat */}
        <mesh position={[0, seatH/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, seatH, d]} />
          {mainMat}
        </mesh>
        {/* Backrest */}
        <mesh position={[0, seatH + (h - seatH)/2, -d/2 + 0.1]} castShadow receiveShadow>
          <boxGeometry args={[w, h - seatH, 0.2]} />
          {mainMat}
        </mesh>
        {/* Armrests */}
        <mesh position={[-w/2 + 0.1, seatH + 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.3, d]} />
          {mainMat}
        </mesh>
        <mesh position={[w/2 - 0.1, seatH + 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.3, d]} />
          {mainMat}
        </mesh>
      </group>
    );
  }

  if (id === 'prod-005') {
    // Floor Lamp
    return (
      <group>
        {/* Base */}
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          {darkMat}
        </mesh>
        {/* Pole */}
        <mesh position={[0, h/2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, h]} />
          {darkMat}
        </mesh>
        {/* Lamp Head */}
        <mesh position={[0, h - 0.2, 0.15]} castShadow receiveShadow rotation={[Math.PI/4, 0, 0]}>
          <coneGeometry args={[0.15, 0.3, 16]} />
          {mainMat}
        </mesh>
      </group>
    );
  }

  if (id === 'prod-006') {
    // Pendant Light
    return (
      <group>
        {/* Wire */}
        <mesh position={[0, h/2 + 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.4]} />
          {darkMat}
        </mesh>
        {/* Dome */}
        <mesh position={[0, h/2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
          {mainMat}
        </mesh>
      </group>
    );
  }

  if (id === 'prod-007') {
    // Bookshelf
    return (
      <group>
        {/* Frame */}
        <mesh position={[-w/2 + 0.05, h/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, h, d]} />
          {woodMat}
        </mesh>
        <mesh position={[w/2 - 0.05, h/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, h, d]} />
          {woodMat}
        </mesh>
        {/* Shelves */}
        {[0.1, 0.5, 0.9, 1.3, 1.7].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[w - 0.2, 0.05, d - 0.05]} />
            {woodMat}
          </mesh>
        ))}
      </group>
    );
  }

  if (id === 'prod-008') {
    // Wall Art
    return (
      <group>
        {/* Frame */}
        <mesh position={[0, h/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Canvas front */}
        <mesh position={[0, h/2, d/2 + 0.005]} castShadow receiveShadow>
          <planeGeometry args={[w - 0.1, h - 0.1]} />
          {mainMat}
        </mesh>
      </group>
    );
  }

  if (id === 'prod-011') {
    // Queen Bed
    const mattressH = 0.4;
    return (
      <group>
        {/* Frame / Base */}
        <mesh position={[0, mattressH/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, mattressH, d]} />
          {woodMat}
        </mesh>
        {/* Mattress */}
        <mesh position={[0, mattressH + 0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[w - 0.1, 0.2, d - 0.1]} />
          {mainMat}
        </mesh>
        {/* Headboard */}
        <mesh position={[0, h/2, -d/2 + 0.05]} castShadow receiveShadow>
          <boxGeometry args={[w, h, 0.1]} />
          {woodMat}
        </mesh>
      </group>
    );
  }

  if (id === 'prod-012' || id === 'prod-015') {
    // Nightstand or TV Console (simple boxy storage)
    return (
      <group>
        <mesh position={[0, h/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          {mainMat}
        </mesh>
        {/* Simple drawer lines to simulate detail */}
        <mesh position={[0, h/2, d/2 + 0.01]} receiveShadow>
          <planeGeometry args={[w - 0.1, h - 0.1]} />
          <meshStandardMaterial color="#222" opacity={0.3} transparent />
        </mesh>
      </group>
    );
  }

  if (id === 'prod-013') {
    // Table Lamp
    return (
      <group>
        {/* Base */}
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[w/3, w/3, 0.1]} />
          {darkMat}
        </mesh>
        {/* Pole */}
        <mesh position={[0, h/2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, h]} />
          {darkMat}
        </mesh>
        {/* Shade */}
        <mesh position={[0, h - 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[w/2, w/2 + 0.05, 0.2]} />
          {mainMat}
        </mesh>
      </group>
    );
  }

  if (id === 'prod-014') {
    // Potted Plant
    return (
      <group>
        {/* Pot */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.1, 0.4]} />
          {darkMat}
        </mesh>
        {/* Leaves (abstracted as a sphere) */}
        <mesh position={[0, h/2 + 0.2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[w/2, 16, 16]} />
          {mainMat}
        </mesh>
      </group>
    );
  }

  // Fallback to simple box
  return (
    <mesh position={[0, h/2, 0]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      {mainMat}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
      </lineSegments>
    </mesh>
  );
}
