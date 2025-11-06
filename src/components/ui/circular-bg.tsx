// "use client";

// import { useEffect, useRef } from "react";

// interface CirclePiece {
//   x: number;
//   y: number;
//   velocityX: number;
//   velocityY: number;
//   size: number;
//   opacity: number;
//   color: string;
//   floatPhase: number;
//   swayAmplitude: number;
// }

// export default function CircleBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationRef = useRef<number | null>(null);
//   const circlesRef = useRef<CirclePiece[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     const themeColors = [
//       "rgba(76,63,142, 1)",
//       "rgba(76,63,142, 0.95)",
//     ];

//     const initCircles = () => {
//       circlesRef.current = [];
//       for (let i = 0; i < 130; i++) {
//         let size;
//         const sizeRandom = Math.random();
//         if (sizeRandom < 0.3) {
//           size = Math.random() * 10 + 8;
//         } else if (sizeRandom < 0.6) {
//           size = Math.random() * 10 + 10;
//         } else if (sizeRandom < 0.85) {
//           size = Math.random() * 15 + 15;
//         } else {
//           size = Math.random() * 20 + 20;
//         }

//         circlesRef.current.push({
//           x: Math.random() * (canvas.width + 400) - 200,
//           y: -Math.random() * canvas.height * 1.2 - size,
//           velocityX: (Math.random() - 0.5) * 0.5,
//           velocityY: Math.random() * 0.4 + 0.2,
//           size: size,
//           opacity: Math.random() * 0.3 + 0.7,
//           color: themeColors[Math.floor(Math.random() * themeColors.length)],
//           floatPhase: Math.random() * Math.PI * 2,
//           swayAmplitude: Math.random() * 0.6 + 0.3,
//         });
//       }
//     };

//     const drawCircle = (circle: CirclePiece) => {
//       ctx.save();
//       ctx.globalAlpha = circle.opacity;
//       ctx.fillStyle = circle.color;

//       ctx.beginPath();
//       ctx.arc(circle.x, circle.y, circle.size * 0.5, 0, Math.PI * 2);
//       ctx.fill();

//       ctx.restore();
//     };

//     const updateCircles = () => {
//       circlesRef.current.forEach((circle) => {
//         circle.floatPhase += 0.015;

//         const swayX = Math.sin(circle.floatPhase) * circle.swayAmplitude;

//         circle.x += circle.velocityX + swayX * 0.2;
//         circle.y += circle.velocityY;

//         circle.velocityX += (Math.random() - 0.5) * 0.01;
//         circle.velocityX *= 0.99;

//         circle.velocityX = Math.max(-1, Math.min(1, circle.velocityX));

//         if (circle.y - circle.size > canvas.height + 50) {
//           circle.x = Math.random() * (canvas.width + 400) - 200;
//           circle.y = -Math.random() * 200 - circle.size;
//           circle.velocityX = (Math.random() - 0.5) * 0.5;
//           circle.velocityY = Math.random() * 0.4 + 0.2;
//           circle.floatPhase = Math.random() * Math.PI * 2;
//         }

//         if (circle.x < -circle.size - 300) {
//           circle.x = canvas.width + circle.size + 100;
//         } else if (circle.x > canvas.width + circle.size + 300) {
//           circle.x = -circle.size - 100;
//         }
//       });
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       updateCircles();
//       circlesRef.current.forEach(drawCircle);

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     initCircles();
//     animate();

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="pointer-events-none fixed inset-0 z-0"
//       style={{
//         background: "transparent",
//       }}
//     />
//   );
// }
"use client";

import { useEffect, useRef } from "react";

interface CirclePiece {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  opacity: number;
  color: string;
  floatPhase: number;
  swayAmplitude: number;
}

interface StarPiece {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  opacity: number;
  floatPhase: number;
  swayAmplitude: number;
  rotation: number;
  rotationSpeed: number;
}

export default function CircleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const circlesRef = useRef<CirclePiece[]>([]);
  const starsRef = useRef<StarPiece[]>([]);
  const starImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load star image
    const starImage = new Image();
    starImage.src = "/promo/star.webp";
    starImage.onload = () => {
      starImageRef.current = starImage;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const themeColors = ["rgba(76,63,142, 1)", "rgba(76,63,142, 0.95)"];

    const initCircles = () => {
      circlesRef.current = [];
      for (let i = 0; i < 130; i++) {
        let size;
        const sizeRandom = Math.random();
        if (sizeRandom < 0.3) {
          size = Math.random() * 10 + 8;
        } else if (sizeRandom < 0.6) {
          size = Math.random() * 10 + 10;
        } else if (sizeRandom < 0.85) {
          size = Math.random() * 15 + 15;
        } else {
          size = Math.random() * 20 + 20;
        }

        circlesRef.current.push({
          x: Math.random() * (canvas.width + 400) - 200,
          y: -Math.random() * canvas.height * 1.2 - size,
          velocityX: (Math.random() - 0.5) * 0.5,
          velocityY: Math.random() * 0.4 + 0.2,
          size: size,
          opacity: Math.random() * 0.3 + 0.7,
          color: themeColors[Math.floor(Math.random() * themeColors.length)],
          floatPhase: Math.random() * Math.PI * 2,
          swayAmplitude: Math.random() * 0.6 + 0.3,
        });
      }
    };

    const initStars = () => {
      starsRef.current = [];
      const starSizes = [40, 50, 60];
      
      for (let i = 0; i < 5; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: -Math.random() * canvas.height * 0.5,
          velocityX: (Math.random() - 0.5) * 0.3,
          velocityY: Math.random() * 0.3 + 0.15,
          size: starSizes[i % starSizes.length],
          opacity: Math.random() * 0.4 + 0.6,
          floatPhase: Math.random() * Math.PI * 2,
          swayAmplitude: Math.random() * 0.8 + 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const drawCircle = (circle: CirclePiece) => {
      ctx.save();
      ctx.globalAlpha = circle.opacity;
      ctx.fillStyle = circle.color;

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawStar = (star: StarPiece) => {
      if (!starImageRef.current) return;

      ctx.save();
      ctx.globalAlpha = star.opacity;

      // Move to star position
      ctx.translate(star.x, star.y);
      
      // Rotate around center
      ctx.rotate(star.rotation);

      // Draw image centered
      ctx.drawImage(
        starImageRef.current,
        -star.size / 2,
        -star.size / 2,
        star.size,
        star.size
      );

      ctx.restore();
    };

    const updateCircles = () => {
      circlesRef.current.forEach((circle) => {
        circle.floatPhase += 0.015;

        const swayX = Math.sin(circle.floatPhase) * circle.swayAmplitude;

        circle.x += circle.velocityX + swayX * 0.2;
        circle.y += circle.velocityY;

        circle.velocityX += (Math.random() - 0.5) * 0.01;
        circle.velocityX *= 0.99;

        circle.velocityX = Math.max(-1, Math.min(1, circle.velocityX));

        if (circle.y - circle.size > canvas.height + 50) {
          circle.x = Math.random() * (canvas.width + 400) - 200;
          circle.y = -Math.random() * 200 - circle.size;
          circle.velocityX = (Math.random() - 0.5) * 0.5;
          circle.velocityY = Math.random() * 0.4 + 0.2;
          circle.floatPhase = Math.random() * Math.PI * 2;
        }

        if (circle.x < -circle.size - 300) {
          circle.x = canvas.width + circle.size + 100;
        } else if (circle.x > canvas.width + circle.size + 300) {
          circle.x = -circle.size - 100;
        }
      });
    };

    const updateStars = () => {
      starsRef.current.forEach((star) => {
        star.floatPhase += 0.012;
        star.rotation += star.rotationSpeed;

        const swayX = Math.sin(star.floatPhase) * star.swayAmplitude;

        star.x += star.velocityX + swayX * 0.15;
        star.y += star.velocityY;

        star.velocityX += (Math.random() - 0.5) * 0.008;
        star.velocityX *= 0.99;

        star.velocityX = Math.max(-0.8, Math.min(0.8, star.velocityX));

        // Reset star when it goes off screen
        if (star.y - star.size > canvas.height + 100) {
          star.x = Math.random() * canvas.width;
          star.y = -Math.random() * 300 - star.size;
          star.velocityX = (Math.random() - 0.5) * 0.3;
          star.velocityY = Math.random() * 0.3 + 0.15;
          star.floatPhase = Math.random() * Math.PI * 2;
          star.rotation = Math.random() * Math.PI * 2;
        }

        if (star.x < -star.size - 200) {
          star.x = canvas.width + star.size + 100;
        } else if (star.x > canvas.width + star.size + 200) {
          star.x = -star.size - 100;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateCircles();
      updateStars();
      
      circlesRef.current.forEach(drawCircle);
      starsRef.current.forEach(drawStar);

      animationRef.current = requestAnimationFrame(animate);
    };

    initCircles();
    initStars();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: "transparent",
      }}
    />
  );
}
