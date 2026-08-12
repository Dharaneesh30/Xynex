import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './Starfield.css';

export default function Starfield({
  starCount = 5000,
  speed = 0.5,
  color = '#ffffff',
  className = ''
}) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    // Add subtle fog to fade stars into the distance perfectly blending into the void
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 100;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    const colors = [];
    
    const baseColor = new THREE.Color(color);
    
    for (let i = 0; i < starCount; i++) {
      // Random positions in a large cube
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000;
      
      vertices.push(x, y, z);
      
      // Variable star sizes
      sizes.push(Math.random() * 2 + 0.5);
      
      // Slight color variations (add a hint of brand blue/violet)
      const starColor = baseColor.clone();
      const randColor = Math.random();
      if (randColor > 0.8) {
        starColor.setHex(0x22D3EE); // Brand cyan
      } else if (randColor > 0.9) {
        starColor.setHex(0xA78BFA); // Brand violet
      }
      colors.push(starColor.r, starColor.g, starColor.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    // Premium glowing dots using a custom shader material
    const vertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    
    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        // Draw a perfect circle
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        // Soft glowing edge
        float alpha = smoothstep(0.5, 0.1, dist);
        gl_FragColor = vec4(vColor, alpha * 0.9);
      }
    `;
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
    
    // Subtle Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      targetX = x * 200; // Parallax strength X
      targetY = y * 200; // Parallax strength Y
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Move stars forward towards the camera (warp speed effect)
      const positions = stars.geometry.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += speed; 
        
        // If star passes the camera, reset it far back in the void
        if (positions[i3 + 2] > 200) {
          positions[i3 + 2] = -1500;
        }
      }
      stars.geometry.attributes.position.needsUpdate = true;
      
      // Smooth parallax camera movement
      mouseX += (targetX - mouseX) * 0.02;
      mouseY += (targetY - mouseY) * 0.02;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(scene.position);
      
      // Slow constant ambient rotation
      stars.rotation.z += 0.0003;
      stars.rotation.x += 0.0001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [starCount, speed, color]);
  
  return <div ref={containerRef} className={`starfield-container ${className}`} />;
}
