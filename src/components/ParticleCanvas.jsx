import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ burstTrigger }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial ambient warm fireplace embers
    for (let i = 0; i < 35; i++) {
      particlesRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.2 - 0.4,
        size: Math.floor(Math.random() * 3) + 2,
        color: Math.random() > 0.4 ? '#f59e0b' : '#ef4444',
        alpha: Math.random() * 0.7 + 0.2,
        isAmbient: true
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.isAmbient) {
          // Wrap ambient embers around screen
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
        } else {
          // Burst sparkle
          p.vy += 0.08; // Gravity
          p.alpha -= 0.02;
          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        // Pixelated square
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Spawn sparkles whenever burstTrigger changes
  useEffect(() => {
    if (!burstTrigger) return;
    const { x, y, color = '#f59e0b', count = 20 } = burstTrigger;
    const targetX = x || window.innerWidth / 2;
    const targetY = y || window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: targetX,
        y: targetY,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        size: Math.floor(Math.random() * 4) + 3,
        color: Math.random() > 0.5 ? color : '#ffd700',
        alpha: 1.0,
        isAmbient: false
      });
    }
  }, [burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999
      }}
    />
  );
}
