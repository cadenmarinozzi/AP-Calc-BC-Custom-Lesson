import { useEffect, useRef } from "react";

export default () => {
  const canvasRef = useRef();
  const particlesRef = useRef([]);
  const M = 20;

  const addParticleStream = () => {
    const particles = particlesRef.current;

    if (particles.length < 1000)
      for (let i = -100; i < 500; i += 5) {
        const r = 10 * M + i;
        const particle = {
          dr: 0,
          p: 0,
          r,
          theta: Math.random(),
          // color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
          color: "black",
          L: Math.sqrt((M * r ** 2) / (r - 3 * M)) - 1,
          size: 2,
        };

        particles.push(particle);
      }
  };

  const addOrbitParticle = () => {
    const particles = particlesRef.current;

    for (let i = 0; i < 1; i += 1) {
      // let b = i / 2;
      // let b = 3 * Math.sqrt(3) * M
      // const x = -200
      // const r = Math.sqrt(x ** 2 + b ** 2);
      // const theta = Math.acos(x / r);
      const x = -200;
      const y = -(3 / 2) * (2 * M) - 63.758767869;
      // const y = -3 * Math.sqrt(3) * M
      const theta = Math.atan2(y, x);
      const r = Math.sqrt(x ** 2 + y ** 2);
      const particle = {
        r,
        theta,
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
        dr: Math.cos(theta),
        p: Math.cos(theta),
        size: 5,
        L: r * Math.sqrt(1 - Math.cos(theta) ** 2),
      };

      if (particles.length < 500) particles.push(particle);
    }
  };

  useEffect(() => {
    const particles = particlesRef.current;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    canvas.addEventListener("click", (e) => {
      let x = e.offsetX - canvas.getBoundingClientRect().width / 2;
      let y = e.offsetY - canvas.getBoundingClientRect().height / 2;

      const r = Math.hypot(x, y);
      const theta = Math.atan2(y, x);

      if (particles.length < 500)
        particles.push({
          dr: 0,
          p: 0,
          r,
          theta,
          size: 5,
          // color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
          color: "black",
          L: Math.sqrt((M * r ** 2) / (r - 3 * M)) - 1,
        });
    });

    const RK4 = (f, y, h = 10) => {
      const k1 = f(y);
      const k2 = f(y + k1 / 2) * h;
      const k3 = f(y + k2 / 2) * h;
      const k4 = f(y + k3) * h;

      return y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    };

    const drawBlackHole = () => {
      ctx.fillStyle = ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 2 * M, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, (3 / 2) * (2 * M), 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    };

    const drawParticle = (particle) => {
      const x = width / 2 + particle.r * Math.cos(particle.theta);
      const y = height / 2 + particle.r * Math.sin(particle.theta);

      ctx.fillStyle = ctx.strokeStyle = particle.dead ? "red" : particle.color;
      ctx.beginPath();
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    };

    // const step = (particle) => {
    //     particle.p = RK4((p) => particle.L ** 2 * (particle.r - 3 * M) / particle.r ** 4, particle.p)

    //     particle.dr = particle.p
    //     particle.dtheta = particle.L / particle.r ** 2

    //     particle.r = RK4((r) => particle.dr, particle.r)
    //     particle.theta = RK4((r) => particle.dtheta, particle.theta)

    //     if (particle.r < 2 * M) {
    //         particle.dead = true;
    //     }
    // }

    const step = (particle) => {
      const r = particle.r;
      const L = particle.L;

      // Correct dp/dτ for massive particle
      const dp_dtau = (p) =>
        -M / r ** 2 + L ** 2 * (1 / r ** 3 - (3 * M) / r ** 4);

      // Update momentum
      particle.p = RK4(dp_dtau, particle.p);

      // Update position
      particle.r = RK4(() => particle.p, particle.r);

      // Update angular position
      particle.theta = RK4(() => L / particle.r ** 2, particle.theta);

      // Check if it falls into the event horizon
      if (particle.r < 2 * M) {
        particle.dead = true;
      }
    };

    const render = (t) => {
      ctx.clearRect(0, 0, width, height);
      drawBlackHole();

      for (const particle of particles) {
        drawParticle(particle);

        if (!particle.dead) step(particle);
      }

      requestAnimationFrame(render);
    };

    setInterval(() => ctx.clearRect(0, 0, width, height), 20000);

    render(0);
  }, [canvasRef.current]);

  return (
    <div
      className={`p-5 bg-base-200 rounded-3xl flex items-center gap-5 flex-col shadow-2xl border border-base-300`}
    >
      <div className="flex flex-row gap-5 items-center">
        <span className="text-2xl">Click anywhere to add a particle</span>
        <button className="btn btn-primary" onClick={addParticleStream}>
          Click me to add particle stream
        </button>
        <button className="btn btn-primary" onClick={addOrbitParticle}>
          Click me to add a particle that orbits
        </button>
      </div>
      <canvas
        className="cursor-pointer bg-white rounded-2xl w-full h-full"
        ref={canvasRef}
      />
    </div>
  );
};
