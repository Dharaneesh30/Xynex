import { useRef, useEffect } from 'react';
import './NetworkConnections.css';

export default function NetworkConnections({
  nodeCount = 80,
  connectionDistance = 150,
  nodeColor = '#A78BFA',
  lineColor = '139, 92, 246', // RGB for brand-violet
  interactionColor = '59, 130, 246', // RGB for brand-blue
  className = ''
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0, // Slow, elegant movement
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 2 + 1
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      
      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        node.x += node.vx;
        node.y += node.vy;
        
        // Wrap around screen instead of bouncing for a continuous network feel
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
        
        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const opacity = 1 - (dist / connectionDistance);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        
        // Draw connections to mouse (simulating routing/networking)
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mDist < 250) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          const mOpacity = 1 - (mDist / 250);
          ctx.strokeStyle = `rgba(${interactionColor}, ${mOpacity * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          // Subtle magnetic attraction to cursor
          node.x -= mdx * 0.02;
          node.y -= mdy * 0.02;
        }
        
        // Draw the data node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
        
        // Glowing effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = nodeColor;
      }
      ctx.shadowBlur = 0; // Reset for lines
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodeCount, connectionDistance, nodeColor, lineColor, interactionColor]);

  return <canvas ref={canvasRef} className={`network-connections-canvas ${className}`} />;
}
