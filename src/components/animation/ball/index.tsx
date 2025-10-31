'use client'
import { useEffect, useRef } from "react";

export default function BallBox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 600;
    canvas.height = 400;

    type Ball = {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    };

    const balls: Ball[] = [];

    // Create a random ball (velocities now in pixels per second for smooth animation)
    const createBall = (): Ball => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 10,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      vx: (Math.random() - 0.5) * 240, // Adjusted: original ~4 pixels/frame at 60 FPS = 240 pixels/second
      vy: (Math.random() - 0.5) * 240,
    });

    // Spawn initial balls
    for (let i = 0; i < 1; i++) balls.push(createBall());

    // Hole position (bottom middle)
    const hole = { x: canvas.width / 2 - 20, y: canvas.height - 10, w: 40, h: 10 };

    let lastTime = 0;

    const update = (currentTime: number) => {
      const deltaTime = lastTime === 0 ? 0 : (currentTime - lastTime) / 1000; // Delta in seconds
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw hole
      ctx.fillStyle = "black";
      ctx.fillRect(hole.x, hole.y, hole.w, hole.h);

      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];

        // Compute movement for this frame
        const deltaX = b.vx * deltaTime;
        const deltaY = b.vy * deltaTime;
        const nextX = b.x + deltaX;
        const nextY = b.y + deltaY;

        const cornerRadius = 50;
        let hitCorner = false;
        let willBounceX = false;
        let willBounceY = false;

        // Check if WILL hit LEFT wall
        if (nextX - b.radius <= 0) {
          willBounceX = true;
          if (nextY < cornerRadius || nextY > canvas.height - cornerRadius) {
            hitCorner = true;
          }
        }

        // Check if WILL hit RIGHT wall
        if (nextX + b.radius >= canvas.width) {
          willBounceX = true;
          if (nextY < cornerRadius || nextY > canvas.height - cornerRadius) {
            hitCorner = true;
          }
        }

        // Check if WILL hit TOP wall
        if (nextY - b.radius <= 0) {
          willBounceY = true;
          if (nextX < cornerRadius || nextX > canvas.width - cornerRadius) {
            hitCorner = true;
          }
        }

        // Check if WILL hit BOTTOM wall
        if (nextY + b.radius >= canvas.height) {
          willBounceY = true;
          if (nextX < cornerRadius || nextX > canvas.width - cornerRadius) {
            hitCorner = true;
          }
        }

        // Spawn new ball IMMEDIATELY when corner is detected (prediction ensures timing aligns with hit)
        if (hitCorner) {
          balls.push(createBall());
        }

        // NOW move the ball
        b.x += deltaX;
        b.y += deltaY;

        // Apply bounces
        if (willBounceX) {
          b.vx *= -1;
          // Prevent sticking
          if (b.x - b.radius < 0) b.x = b.radius;
          if (b.x + b.radius > canvas.width) b.x = canvas.width - b.radius;
        }

        if (willBounceY) {
          b.vy *= -1;
          // Prevent sticking
          if (b.y - b.radius < 0) b.y = b.radius;
          if (b.y + b.radius > canvas.height) b.y = canvas.height - b.radius;
        }

        // Check if ball goes through hole
        if (
          b.y + b.radius >= hole.y &&
          b.x > hole.x &&
          b.x < hole.x + hole.w
        ) {
          balls.splice(i, 1); // delete ball
          continue;
        }

        // Draw ball
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      }

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <canvas ref={canvasRef} className="bg-white rounded-lg shadow-lg" />
    </div>
  );
}