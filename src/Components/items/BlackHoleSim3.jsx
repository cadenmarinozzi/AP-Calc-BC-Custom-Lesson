import { useEffect, useRef } from "react";

export default () => {
  const canvasRef = useRef();
  const particlesRef = useRef([]);
  const M = 20;
  const showTrails = useRef(true);
  const stepSize = useRef(300);
  let ctx;

  useEffect(() => {
    const particles = particlesRef.current;

    const canvas = canvasRef.current;

    ctx = canvas.getContext("2d");

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    canvas.addEventListener("click", (e) => {
      let x = e.offsetX - canvas.getBoundingClientRect().width / 2;
      let y = e.offsetY - canvas.getBoundingClientRect().height / 2;

      const r = Math.hypot(x, y);
      const theta = Math.atan2(y, x);

      if (particles.length < 100)
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

    const RK4 = (f, y, h = 200) => {
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

    const drawParticle = (particle, lastParticle) => {
      const x = width / 2 + particle.r * Math.cos(particle.theta);
      const y = height / 2 + particle.r * Math.sin(particle.theta);

      const x2 = width / 2 + lastParticle.r * Math.cos(lastParticle.theta);
      const y2 = height / 2 + lastParticle.r * Math.sin(lastParticle.theta);

      ctx.fillStyle = ctx.strokeStyle = particle.dead ? "red" : particle.color;
      ctx.beginPath();
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      if (showTrails.current) {
        ctx.fillStyle = ctx.strokeStyle = "rgba(150, 150, 150, 0.5)";
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2, y);
        ctx.stroke();

        ctx.fillStyle = ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }
      // ctx.closePath();
      // }
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
      particle.p = RK4(dp_dtau, particle.p, stepSize.current);

      // Update position
      particle.r = RK4(() => particle.p, particle.r, stepSize.current);

      // Update angular position
      particle.theta = RK4(
        () => L / particle.r ** 2,
        particle.theta,
        stepSize.current
      );

      // Check if it falls into the event horizon
      if (particle.r < 2 * M) {
        particle.dead = true;
      }
    };

    const render = (t) => {
      const lastParticles = [...particles.map((particle) => ({ ...particle }))];

      if (!showTrails.current) ctx.clearRect(0, 0, width, height);
      drawBlackHole();

      for (const [index, particle] of Object.entries(particles)) {
        if (!particle.dead) step(particle);
        drawParticle(particle, lastParticles[index]);
      }

      setTimeout(render, stepSize.current / 2);
    };

    setInterval(() => ctx.clearRect(0, 0, width, height), 10000);

    render(0);
  }, [canvasRef.current]);

  const setShowTrails = (show) => {
    ctx.clearRect(0, 0, width, height);
  };

  return (
    <div
      className={`p-5 bg-base-200 rounded-3xl flex items-center gap-5 flex-col shadow-2xl border border-base-300`}
    >
      <div className="flex flex-row gap-5 items-center">
        <span className="text-2xl">Click anywhere to add a particle</span>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
          <label className="label">
            <input
              type="checkbox"
              defaultChecked
              className="toggle"
              onChange={(e) => {
                showTrails.current = e.target.checked;
                setShowTrails(e.target.checked);
              }}
            />
            <span className="text-black text-lg ">Show trails</span>
          </label>
        </fieldset>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
          <label className="label flex flex-col items-start gap-1">
            <span className="text-black text-lg ">Step size</span>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              onChange={(e) => (stepSize.current = e.target.value)}
              className="range"
            />
          </label>
        </fieldset>
      </div>
      <canvas
        className="cursor-pointer bg-white rounded-2xl w-full h-full"
        ref={canvasRef}
      />
    </div>
  );
};
