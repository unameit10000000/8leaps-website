import React, { useRef, useEffect, useState } from "react";

const ParticleLogo = ({
  logoSrc,
  colors = [],
  particleDensity = 10,
  particleSpeed = 5,
  particleSize = 3,
  particleType = "circle",
  randomizeSizes = true,
  enableHoverEffect = false,
  hoverRadius = 200,
  hoverStrength = 10,
  backgroundColor = "black",
  width = "100%",
  height = "100%",
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Handle mouse movement for hover effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Initialize canvas and load SVG
  useEffect(() => {
    const loadLogoAndInitialize = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { width, height } = setupCanvas(canvas);

      // Load the SVG
      const svgElement = await loadSVG(logoSrc);

      if (svgElement) {
        // Extract colors from SVG if no custom colors provided
        const extractedColors = extractColorsFromSVG(svgElement);
        const colorsToUse = colors.length > 0 ? colors : extractedColors;

        // Get particle destinations
        const destinations = await getSVGParticleDestinations(
          svgElement,
          width,
          height,
          particleDensity
        );

        // Create particles
        particlesRef.current = createParticles(
          destinations,
          colorsToUse,
          particleSize,
          width,
          height,
          particleType,
          randomizeSizes
        );

        // Mark logo as loaded to start animation
        setLogoLoaded(true);
      }
    };

    loadLogoAndInitialize();

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current) {
        resizeCanvas(canvasRef.current);
        loadLogoAndInitialize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    logoSrc,
    colors,
    particleDensity,
    particleSize,
    particleType,
    randomizeSizes,
  ]);

  // Animation loop
  useEffect(() => {
    if (!logoLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fill with background initially
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const render = () => {
      // Fade background
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Update and render particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        updateParticle(
          particles[i],
          mouseRef.current,
          enableHoverEffect,
          hoverRadius,
          hoverStrength,
          particleSpeed
        );
        renderParticle(particles[i], ctx);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    logoLoaded,
    backgroundColor,
    enableHoverEffect,
    hoverRadius,
    hoverStrength,
    particleSpeed,
  ]);

  return (
    <div style={{ width, height, position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor,
          display: "block",
        }}
      />
    </div>
  );
};

// Canvas setup function
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  return { width: rect.width, height: rect.height };
}

// Canvas resize function
function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  return { width: rect.width, height: rect.height };
}

// SVG loading function
async function loadSVG(url) {
  try {
    const absoluteUrl = url.startsWith("http")
      ? url
      : window.location.origin + url;

    const response = await fetch(absoluteUrl, {
      cache: "no-store",
      headers: {
        Accept: "image/svg+xml",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to load SVG: ${response.status} ${response.statusText}`
      );
    }

    const svgText = await response.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = svgText.trim();

    const svgElement = tempDiv.querySelector("svg");
    if (!svgElement) {
      throw new Error("No SVG element found in the loaded file");
    }

    svgElement.setAttribute("id", "imported-logo");

    return svgElement;
  } catch (error) {
    console.error("Error loading SVG:", error);
    return null;
  }
}

// Extract colors from SVG
function extractColorsFromSVG(svgElement) {
  const colors = [];
  const elements = svgElement.querySelectorAll("[fill]");

  elements.forEach((el) => {
    const fill = el.getAttribute("fill");
    if (fill && fill !== "none" && !colors.includes(fill)) {
      colors.push(fill);
    }
  });

  if (colors.length === 0) {
    colors.push("#ffffff");
  }

  return colors;
}

// Get particle destinations from SVG
async function getSVGParticleDestinations(svgElement, width, height, density) {
  return new Promise((resolve) => {
    const destinations = [];

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let drawWidth, drawHeight;

      if (width / height > aspectRatio) {
        drawHeight = height * 0.8;
        drawWidth = drawHeight * aspectRatio;
      } else {
        drawWidth = width * 0.8;
        drawHeight = drawWidth / aspectRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      const imageData = ctx.getImageData(0, 0, width, height).data;

      const step = Math.max(1, Math.floor(1 / (density / 100)));

      for (let i = 0; i < width; i += step) {
        for (let j = 0; j < height; j += step) {
          const index = (j * width + i) * 4;
          const alpha = imageData[index + 3];

          if (alpha > 128) {
            destinations.push({ x: i, y: j });
          }
        }
      }

      URL.revokeObjectURL(url);

      const maxParticles = 3000;
      if (destinations.length > maxParticles) {
        const ratio = maxParticles / destinations.length;
        const sampledDestinations = [];

        for (let i = 0; i < destinations.length; i++) {
          if (Math.random() < ratio) {
            sampledDestinations.push(destinations[i]);
          }
        }

        resolve(sampledDestinations);
      } else {
        resolve(destinations);
      }
    };

    img.src = url;
  });
}

/**
 * Creates a particle with the given options
 * @param {Object} options - Particle options
 * @param {Array} colors - Available colors for the particle
 * @param {number} size - Size multiplier for the particle
 * @param {string} type - Type of particle (circle, square)
 * @param {boolean} randomSize - Whether to randomize particle size
 * @returns {Object} - The created particle
 */
function createParticle(
  options,
  colors,
  size,
  type = "circle",
  randomSize = true
) {
  const particle = {
    x: options.x || 0,
    y: options.y || 0,
    vx: (Math.random() - 0.5) * 20,
    vy: (Math.random() - 0.5) * 20,
    accX: 0,
    accY: 0,
    dest: { x: options.destX || 0, y: options.destY || 0 },
    originalDest: { x: options.destX || 0, y: options.destY || 0 },
    r: randomSize ? Math.random() * size + 1 : size,
    friction: Math.random() * 0.05 + 0.9,
    color: colors[Math.floor(Math.random() * colors.length)],
    visible: true,
    type: type,
  };

  return particle;
}

/**
 * Creates multiple particles based on destinations
 * @param {Array} destinations - Array of destination points
 * @param {Array} colors - Available colors for particles
 * @param {number} size - Size multiplier for particles
 * @param {number} canvasWidth - Width of the canvas
 * @param {number} canvasHeight - Height of the canvas
 * @param {string} type - Type of particle (circle, square)
 * @param {boolean} randomSizes - Whether to randomize particle sizes
 * @returns {Array} - Array of created particles
 */
function createParticles(
  destinations,
  colors,
  size,
  canvasWidth,
  canvasHeight,
  type = "circle",
  randomSizes = true
) {
  const particles = [];

  for (let i = 0; i < destinations.length; i++) {
    particles.push(
      createParticle(
        {
          x: canvasWidth / 2,
          y: canvasHeight / 2,
          destX: destinations[i].x,
          destY: destinations[i].y,
        },
        colors,
        size,
        type,
        randomSizes
      )
    );
  }

  return particles;
}

/**
 * Updates a particle's position and attributes
 * @param {Object} particle - The particle to update
 * @param {Object} mouse - Mouse position
 * @param {boolean} hoverEnabled - Whether hover effect is enabled
 * @param {number} hoverRadius - Radius of hover effect
 * @param {number} hoverStrength - Strength of hover effect
 * @param {number} speedFactor - Speed factor for movement
 * @returns {Object} - The updated particle
 */
function updateParticle(
  particle,
  mouse,
  hoverEnabled,
  hoverRadius,
  hoverStrength,
  speedFactor
) {
  // Hover effect (repel particles from mouse)
  if (hoverEnabled && particle.visible) {
    const dx = particle.x - mouse.x;
    const dy = particle.y - mouse.y;
    const distToMouse = Math.sqrt(dx * dx + dy * dy);

    if (distToMouse < hoverRadius) {
      // Calculate how much to repel based on distance
      const force = (1 - distToMouse / hoverRadius) * hoverStrength;

      // Create vector from mouse to particle
      const angleToMouse = Math.atan2(dx, dy);

      // Apply temporary offset to destination
      particle.dest.x =
        particle.originalDest.x + Math.sin(angleToMouse) * force * 15;
      particle.dest.y =
        particle.originalDest.y + Math.cos(angleToMouse) * force * 15;
    } else {
      // Reset to original destination when outside effect radius
      particle.dest.x = particle.originalDest.x;
      particle.dest.y = particle.originalDest.y;
    }
  } else {
    // When hover effect is disabled, restore original destination
    particle.dest.x = particle.originalDest.x;
    particle.dest.y = particle.originalDest.y;
  }

  // Apply speed factor to movement
  const speedDivisor = 1000 / (speedFactor * 2);

  particle.accX = (particle.dest.x - particle.x) / speedDivisor;
  particle.accY = (particle.dest.y - particle.y) / speedDivisor;

  particle.vx += particle.accX;
  particle.vy += particle.accY;

  // Apply dynamic friction based on speed factor
  const dynamicFriction = 0.9 - speedFactor * 0.005;
  const clampedFriction = Math.max(0.8, Math.min(0.95, dynamicFriction));

  particle.vx *= clampedFriction;
  particle.vy *= clampedFriction;

  particle.x += particle.vx;
  particle.y += particle.vy;

  return particle;
}

/**
 * Renders a particle on the canvas
 * @param {Object} particle - The particle to render
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
function renderParticle(particle, ctx) {
  ctx.save();
  ctx.fillStyle = particle.color;

  if (!particle.visible) {
    ctx.globalAlpha = 0;
  }

  if (particle.type === "square") {
    const halfSize = particle.r;
    ctx.fillRect(
      particle.x - halfSize,
      particle.y - halfSize,
      halfSize * 2,
      halfSize * 2
    );
  } else if (particle.type === "triangle") {
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y - particle.r);
    ctx.lineTo(particle.x - particle.r, particle.y + particle.r);
    ctx.lineTo(particle.x + particle.r, particle.y + particle.r);
    ctx.closePath();
    ctx.fill();
  } else {
    // Default is circle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
    ctx.fill();
  }

  ctx.restore();
}

export default ParticleLogo;
