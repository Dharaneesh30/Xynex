import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const LEFT_PATH_D = "M20,10 L45,40 C50,45 50,55 45,60 L20,90 C15,95 5,90 10,80 L25,50 L10,20 C5,10 15,5 20,10 Z";
const RIGHT_PATH_D = "M80,10 L55,40 C50,45 50,55 55,60 L80,90 C85,95 95,90 90,80 L75,50 L90,20 C95,10 85,5 80,10 Z";

const numParticles = 400; // Total particles for a dense look

// Helper to sample SVG path
function samplePoints(pathD, count) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathD);
  const length = path.getTotalLength();
  const points = [];
  for (let i = 0; i < count; i++) {
    const pt = path.getPointAtLength((i / count) * length + (Math.random() * (length / count / 2)));
    points.push({ x: pt.x, y: pt.y });
  }
  return points;
}

function ParticleSwarm({ phase }) {
  const meshRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate particle data
  const particles = useMemo(() => {
    const leftPoints = samplePoints(LEFT_PATH_D, numParticles / 2);
    const rightPoints = samplePoints(RIGHT_PATH_D, numParticles / 2);
    const allPoints = [...leftPoints, ...rightPoints];
    
    // Calculate precise scale to match 300px logo on screen
    // FOV is 45, final Z is 15. Visible height at Z=0 is: 2 * 15 * tan(22.5 deg) ≈ 12.4264
    // scale = (300 / windowHeight) * (12.4264 / 100)
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const logoSize = windowWidth < 768 ? 200 : 300;
    const scale = (logoSize / windowHeight) * 0.124264;

    return new Array(numParticles).fill().map((_, i) => {
      const isLeft = i < numParticles / 2;
      const target = allPoints[i];
      
      // Target coordinates
      const tx = (target.x - 50) * scale;
      const ty = -(target.y - 50) * scale;
      const tz = 0;

      // Start widely scattered in 3D
      const sx = (Math.random() - 0.5) * 40;
      const sy = (Math.random() - 0.5) * 40;
      const sz = (Math.random() - 0.5) * 40 - 10;
      
      // Color
      const color = new THREE.Color(isLeft ? "#0057FE" : "#4A11C0");
      color.multiplyScalar(Math.random() * 1.5 + 0.5); // Add some variation

      return {
        t: Math.random() * 100, // random time offset
        speed: 0.01 + Math.random() * 0.01,
        sx, sy, sz,
        tx, ty, tz,
        color,
        scale: Math.random() * 0.15 + 0.05
      };
    });
  }, []);

  const colorArray = useMemo(() => {
    const array = new Float32Array(numParticles * 3);
    particles.forEach((p, i) => p.color.toArray(array, i * 3));
    return array;
  }, [particles]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Animation progress based on phase
    const time = state.clock.elapsedTime;
    
    // Instead of complex math, let's actually store current position in the particle object itself to lerp it
    particles.forEach((p, i) => {
      // Initialize current position if not set
      if (p.cx === undefined) p.cx = p.sx;
      if (p.cy === undefined) p.cy = p.sy;
      if (p.cz === undefined) p.cz = p.sz;

      // Determine target for this frame
      let targetX, targetY, targetZ;
      if (phase === 'scatter') {
        targetX = p.sx + Math.sin(time * 2 + p.t) * 2;
        targetY = p.sy + Math.cos(time * 2 + p.t) * 2;
        targetZ = p.sz + Math.sin(time * 1 + p.t) * 2;
      } else {
        // Converge and form the butterfly
        targetX = p.tx;
        targetY = p.ty;
        targetZ = p.tz;
      }

      // Lerp speed
      const lerpFactor = phase === 'scatter' ? delta * 1 : delta * 3;

      p.cx += (targetX - p.cx) * lerpFactor;
      p.cy += (targetY - p.cy) * lerpFactor;
      p.cz += (targetZ - p.cz) * lerpFactor;

      dummy.position.set(p.cx, p.cy, p.cz);
      
      // Fade out size in text phase
      let currentScale = p.scale;
      if (phase === 'text') {
        currentScale = Math.max(0, currentScale - delta * 0.2);
        p.scale = currentScale;
      }
      
      dummy.scale.set(currentScale, currentScale, currentScale);
      
      // Rotate slowly
      dummy.rotation.x = time * p.speed * 20;
      dummy.rotation.y = time * p.speed * 20;
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, numParticles]}>
      <octahedronGeometry args={[1, 0]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </octahedronGeometry>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

function CameraRig({ phase }) {
  const { camera } = useThree();
  
  useFrame((state, delta) => {
    // Camera movement
    const time = state.clock.elapsedTime;
    
    if (phase === 'scatter') {
      // Pulling back slowly
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 20, delta * 0.5);
      camera.position.x = Math.sin(time * 0.2) * 5;
      camera.position.y = Math.cos(time * 0.2) * 5;
    } else {
      // Lock into center
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, delta * 2);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, delta * 2);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15, delta * 2);
    }
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function ButterflyIntro({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState('scatter'); // 'scatter' -> 'converge' -> 'text'

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('text');
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }

    const scatterTimer = setTimeout(() => setPhase('converge'), 2500);
    const textTimer = setTimeout(() => setPhase('text'), 5000);
    const completeTimer = setTimeout(onComplete, 7500);

    return () => {
      clearTimeout(scatterTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [prefersReducedMotion, onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 bg-[#06070C] flex items-center justify-center overflow-hidden"
      >
        <button 
          onClick={onComplete}
          className="absolute top-8 right-8 text-ink-muted hover:text-ink text-sm font-medium tracking-wide z-10 transition-colors"
        >
          Skip Intro
        </button>

        {/* 3D Scene */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <color attach="background" args={['#06070C']} />
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
              <ParticleSwarm phase={phase} />
              <CameraRig phase={phase} />
            </Canvas>
          </div>
        )}

        {/* 2D Overlay (Logo + Text) */}
        <div className="relative w-full max-w-2xl aspect-square md:aspect-video flex items-center justify-center pointer-events-none">
          <motion.div 
            className="absolute z-10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: (phase === 'text' || phase === 'converge') ? 1 : 0,
              scale: (phase === 'text' || phase === 'converge') ? 1 : 0.95
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              delay: phase === 'converge' ? 1.5 : 0 // Fade in slightly after convergence starts
            }}
          >
            <div className={`relative ${(phase === 'text') ? 'drop-shadow-[0_0_40px_rgba(74,17,192,0.6)]' : ''} transition-all duration-1000`}>
              <img src="/src/assets/logo/xynex-mark.svg" alt="XYNEX Logo" className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]" />
            </div>

            <motion.div 
              className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-6 md:pt-8 text-center w-[90vw] md:w-max"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'text' ? 1 : 0, y: phase === 'text' ? 0 : 20 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-[0.1em] md:tracking-[0.2em] mb-3">
                <span className="text-white">DESIGN BEYOND </span>
                <span className="text-[#0057FE]">DIMENSIONS</span>
              </h1>
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
