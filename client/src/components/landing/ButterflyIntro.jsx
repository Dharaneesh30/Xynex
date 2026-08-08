import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const LEFT_PATH_D = "M20,10 L45,40 C50,45 50,55 45,60 L20,90 C15,95 5,90 10,80 L25,50 L10,20 C5,10 15,5 20,10 Z";
const RIGHT_PATH_D = "M80,10 L55,40 C50,45 50,55 55,60 L80,90 C85,95 95,90 90,80 L75,50 L90,20 C95,10 85,5 80,10 Z";

// Small abstract butterfly shape for particles
const ParticleShape = ({ colorClass }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" className={colorClass}>
    <path d="M1,1 L4.5,4 C5,4.5 5,5.5 4.5,6 L1,9 C0.5,9.5 -0.5,9 0,8 L2.5,5 L0,2 C-0.5,1 0.5,0.5 1,1 Z" fill="currentColor" />
    <path d="M9,1 L5.5,4 C5,4.5 5,5.5 5.5,6 L9,9 C9.5,9.5 10.5,9 10,8 L7.5,5 L10,2 C10.5,1 9.5,0.5 9,1 Z" fill="currentColor" />
  </svg>
);

export default function ButterflyIntro({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState('scatter'); // 'scatter' -> 'converge' -> 'locked' -> 'text'
  const [targetPoints, setTargetPoints] = useState({ left: [], right: [] });

  const numParticles = 80; // 40 per wing

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('text');
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }

    // Sample points from path
    const samplePoints = (pathD, numPoints) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathD);
      const length = path.getTotalLength();
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        // Sample somewhat evenly but with a little noise
        const pt = path.getPointAtLength((i / numPoints) * length + (Math.random() * (length / numPoints / 2)));
        points.push({ x: pt.x, y: pt.y });
      }
      return points;
    };

    setTargetPoints({
      left: samplePoints(LEFT_PATH_D, numParticles / 2),
      right: samplePoints(RIGHT_PATH_D, numParticles / 2)
    });

    // Sequence timing
    const scatterTimer = setTimeout(() => setPhase('converge'), 2500);
    const lockTimer = setTimeout(() => setPhase('locked'), 4500);
    const textTimer = setTimeout(() => setPhase('text'), 5000);
    const completeTimer = setTimeout(onComplete, 7500);

    return () => {
      clearTimeout(scatterTimer);
      clearTimeout(lockTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [prefersReducedMotion, onComplete]);

  // Generate initial random positions for scattered butterflies
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < numParticles; i++) {
      const isLeft = i < numParticles / 2;
      arr.push({
        id: i,
        isLeft,
        startX: Math.random() * 100, // percentage
        startY: Math.random() * 100,
        scatterX: Math.random() * 100,
        scatterY: Math.random() * 100,
        rotation: Math.random() * 360,
        colorClass: isLeft ? "text-brand-blue" : "text-brand-violet",
        delay: Math.random() * 0.5
      });
    }
    return arr;
  }, [numParticles]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 bg-void flex items-center justify-center overflow-hidden"
      >
        <button 
          onClick={onComplete}
          className="absolute top-8 right-8 text-ink-muted hover:text-ink text-sm font-medium tracking-wide z-10 transition-colors"
        >
          Skip Intro
        </button>

        <div className="relative w-full max-w-2xl aspect-square md:aspect-video flex items-center justify-center">
          
          {/* Particles Stage */}
          {(!prefersReducedMotion && phase !== 'text' && targetPoints.left.length > 0) && (
            <div className="fixed inset-0 pointer-events-none">
              {particles.map((p, i) => {
                const target = p.isLeft ? targetPoints.left[i % (numParticles/2)] : targetPoints.right[i % (numParticles/2)];
                
                let x, y, scale, opacity, rotate;
                if (phase === 'scatter') {
                  x = `${p.scatterX}vw`;
                  y = `${p.scatterY}vh`;
                  scale = Math.random() * 0.5 + 0.5;
                  opacity = 0.6;
                  rotate = p.rotation + 180;
                } else if (phase === 'converge' || phase === 'locked') {
                  // The SVG is 100x100 viewBox, we'll scale it to be centered in a 300px box
                  // We map 0-100 to center viewport coords
                  x = `calc(50vw + ${(target.x - 50) * 3}px)`;
                  y = `calc(50vh + ${(target.y - 50) * 3}px)`;
                  scale = phase === 'locked' ? 0 : 1; // shrink them out as lock happens
                  opacity = phase === 'locked' ? 0 : 1;
                  rotate = 0;
                }

                return (
                  <motion.div
                    key={p.id}
                    className="absolute top-0 left-0"
                    initial={{ x: `${p.startX}vw`, y: `${p.startY}vh`, scale: 0, opacity: 0, rotate: p.rotation }}
                    animate={{ x, y, scale, opacity, rotate }}
                    transition={
                      phase === 'scatter' ? { duration: 2.5, ease: "easeInOut", delay: p.delay } :
                      phase === 'converge' ? { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: Math.random() * 0.5 } :
                      { duration: 0.5 }
                    }
                  >
                    <ParticleShape colorClass={p.colorClass} />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Locked SVG Mark */}
          <motion.div 
            className="absolute z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: (phase === 'locked' || phase === 'text') ? 1 : 0,
              scale: (phase === 'locked' || phase === 'text') ? 1 : 0.9
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={`relative ${phase === 'locked' ? 'drop-shadow-[0_0_30px_rgba(74,17,192,0.5)]' : ''} transition-all duration-1000`}>
              <img src="/src/assets/logo/xynex-mark.svg" alt="XYNEX Logo" className="w-[300px] h-[300px]" />
            </div>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'text' ? 1 : 0, y: phase === 'text' ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[0.2em] mb-3">
                <span className="text-ink">DESIGN BEYOND </span>
                <span className="text-brand-violet-light">DIMENSIONS</span>
              </h1>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
