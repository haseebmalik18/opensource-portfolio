'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Comet {
  x: number;
  y: number;
  speed: number;
  angle: number;
  length: number;
  opacity: number;
  size: number;
  color: { r: number; g: number; b: number };
  sparks: Spark[];
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };


    const cometColor = { r: 255, g: 250, b: 230 };

    const createComet = (): Comet => {
      const side = Math.floor(Math.random() * 4);
      let x: number, y: number, angle: number;

      switch (side) {
        case 0:
          x = Math.random() * canvas.width;
          y = -50;
          angle = Math.random() * 0.8 + 0.4;
          break;
        case 1:
          x = canvas.width + 50;
          y = Math.random() * canvas.height;
          angle = Math.random() * 0.8 + 2.3;
          break;
        case 2:
          x = Math.random() * canvas.width;
          y = canvas.height + 50;
          angle = -Math.random() * 0.8 - 0.4;
          break;
        default:
          x = -50;
          y = Math.random() * canvas.height;
          angle = Math.random() * 0.8 - 0.4;
      }

      return {
        x,
        y,
        speed: 6,
        angle,
        length: 130,
        opacity: 0.8,
        size: 2,
        color: cometColor,
        sparks: [],
      };
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    cometsRef.current = [createComet()];

    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;


      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.5 + 0.5;
        const currentOpacity = star.opacity * (0.4 + twinkle * 0.6);

        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
        gradient.addColorStop(0, `rgba(200, 180, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(150, 130, 220, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });


      cometsRef.current.forEach((comet, index) => {
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;


        if (Math.random() < 0.6) {
          const sparkAngle = comet.angle + Math.PI + (Math.random() - 0.5) * 1.2;
          comet.sparks.push({
            x: comet.x + (Math.random() - 0.5) * comet.size * 2,
            y: comet.y + (Math.random() - 0.5) * comet.size * 2,
            vx: Math.cos(sparkAngle) * (Math.random() * 2 + 1),
            vy: Math.sin(sparkAngle) * (Math.random() * 2 + 1),
            life: 1,
            maxLife: Math.random() * 30 + 20,
            size: Math.random() * 2 + 0.5,
          });
        }


        comet.sparks = comet.sparks.filter((spark) => {
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.vx *= 0.98;
          spark.vy *= 0.98;
          spark.life += 1;

          if (spark.life >= spark.maxLife) return false;

          const lifeRatio = Math.max(0, 1 - spark.life / spark.maxLife);
          const radius = Math.max(0.1, spark.size * lifeRatio);

          ctx.fillStyle = `rgba(${comet.color.r}, ${comet.color.g}, ${comet.color.b}, ${lifeRatio * 0.8})`;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, radius, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });


        const tailX = comet.x - Math.cos(comet.angle) * comet.length;
        const tailY = comet.y - Math.sin(comet.angle) * comet.length;


        const trailGradient = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
        trailGradient.addColorStop(0, 'transparent');
        trailGradient.addColorStop(0.7, `rgba(${comet.color.r}, ${comet.color.g}, ${comet.color.b}, 0.3)`);
        trailGradient.addColorStop(1, `rgba(255, 255, 255, 0.8)`);

        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(comet.x, comet.y);
        ctx.stroke();


        const headGlow = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 8);
        headGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
        headGlow.addColorStop(0.4, `rgba(${comet.color.r}, ${comet.color.g}, ${comet.color.b}, 0.5)`);
        headGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 8, 0, Math.PI * 2);
        ctx.fill();


        const margin = 200;
        if (
          comet.x < -margin ||
          comet.x > canvas.width + margin ||
          comet.y < -margin ||
          comet.y > canvas.height + margin
        ) {
          cometsRef.current.splice(index, 1);
        }
      });


      if (Math.random() < 0.02 && cometsRef.current.length < 5) {
        const newComet = createComet();
        const tooClose = cometsRef.current.some((existing) => {
          const dx = existing.x - newComet.x;
          const dy = existing.y - newComet.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < 250;
        });
        if (!tooClose) {
          cometsRef.current.push(newComet);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
