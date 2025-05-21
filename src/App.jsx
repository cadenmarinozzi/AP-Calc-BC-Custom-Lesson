import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import BlackHoleAccretion from "./assets/images/BlackHoleAccretion.jpg";
import BlackHoleCameraRay from "./assets/images/BlackHoleCameraRay.jpg";
import BlackHoleEH from "./assets/images/BlackHoleEH.jpg";
import BlackHoleAccretionFuzzy from "./assets/images/BlackHoleFuzzy.jpeg";
import BlackHolePhotonRing from "./assets/images/BlackHolePhotonRing.jpg";
import BlackHoleReal from "./assets/images/BlackHoleReal.jpg";
import Erik from "./assets/images/Erik.jpg";
import Info from "./assets/images/Info.jpg";
import Interstellar from "./assets/images/Interstellar.jpg";
import Render from "./assets/images/Render.jpg";
import RK from "./assets/images/RK.jpg";
import RK444 from "./assets/images/RK444.jpg";
import Schw from "./assets/images/Schw.jpg";
import Spiral from "./assets/images/Spiral.jpg";
import Vel from "./assets/images/Vel.jpg";
import BlackHoleSim1 from "./Components/items/BlackHoleSim1";
import BlackHoleSim2 from "./Components/items/BlackHoleSim2";
import BlackHoleSim3 from "./Components/items/BlackHoleSim3";
import Image from "./Components/shared/Image";

const App = () => {
  return (
    <div className="flex flex-col gap-15">
      <h1 className="text-5xl font-bold">
        AP Honors Advanced Relativistics BC 1-2
      </h1>
      <div className="divider" />
      <h2 className="text-4xl font-bold">1. Introduction</h2>
      <Image src={Interstellar} />
      <span className="text-2xl">
        If you've ever watched Interstellar, you've probably seen the black hole
        "Gargantua" that was shown.
      </span>
      <span className="text-2xl font-semibold">
        Today we're going to learn how it was made, and what it all means.
      </span>
      <div className="divider" />
      <h2 className="text-4xl font-bold">2. What is a black hole</h2>
      <span className="text-2xl">
        Simply put, a black hole is an object in space that is so incredibly
        dense that nothing can escape its gravitational pull, <b>even light</b>.
      </span>
      <span className="text-2xl">
        That's why conventional black hole images look like:
      </span>
      <Image src="https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2025/03/blackhole-3ITG-1741951760229.jpg?size=*:900" />
      <span className="text-2xl font-bold">
        Which is completely inaccurate.
      </span>
      <span className="text-2xl">
        In reality, this is what a realistic black hole would look like:
      </span>
      <Image src={BlackHoleReal} />
      <span className="text-2xl">
        A remarkably flat donut shaped disk (or "torus") rotating around a
        completely dark center called the <b>event horizon</b>
      </span>
      <span className="text-2xl">
        We'll learn why that is, and how it forms.
      </span>
      <h2 className="text-4xl font-bold">Topic 1. Black hole formation</h2>
      <span className="text-2xl">
        After a star has run out of fuel, the force of gravity is stronger than
        the outward pressure from atomic fusion, and it collapses with an
        immense amount of energy.
      </span>
      <span className="text-2xl">
        The centermost area of mass becomes <b>extremely dense</b>, as all of
        the inward pressure crushes it into a smaller and smaller mass.
      </span>
      <span className="text-2xl">
        In an instant, the mass becomes so dense that a black hole is formed.
      </span>
      <span className="text-2xl">
        There are two main variables at play here:{" "}
        <b>Density (How compact the matter is)</b>, and{" "}
        <b>Mass (How much matter there is)</b>
      </span>
      <h2 className="text-4xl font-bold">Topic 2. Parts of a black hole</h2>
      <Image src={Info} />
      <span className="text-2xl">
        A black hole has <b>3</b> main parts. The <b>event horizon</b>, the{" "}
        <b>photon ring</b>, and the <b>accretion disk</b>.
      </span>
      <Image src={BlackHoleEH} />
      <span className="text-2xl">
        The <b>event horizon</b> is a radius around the center of the black hole
        where the gravitational pull of the black hole is so strong that
        nothing, even light, can escape. This is what is typically depicted in
        black hole images.
      </span>
      <Image src={BlackHolePhotonRing} />
      <span className="text-2xl">
        The <b>photon ring</b> is a ring around the event horizon where light is
        extremely close to the event horizon, but not close enough to be pulled
        in. This causes the light to spiral or orbit around the event horizon,
        and eventually shoot off into some direction.
      </span>
      <span className="text-xl">
        The left figure is light being pulled into the event horizon. The right
        figure is light that is extremely close, but not quite enough to be
        pulled in
      </span>
      <Image src={Spiral} />
      <Image src={BlackHoleAccretion} />
      <span className="text-2xl">
        The <b>accretion disk</b> is a torus (donut shaped disk) around the
        event horizon where hot plasma and matter orbit around the black hole.
      </span>
      <span className="text-2xl">
        The accretion disk becomes more and more flat as time goes on, with a
        younger black hole's accretion disk being more "fuzzy"
      </span>
      <Image src={BlackHoleAccretionFuzzy} />
      <span className="text-3xl font-bold">
        But why is the accretion disk a torus? Why not a sphere? Because isn't
        matter being pulled in from all directions?
      </span>
      <Image src="https://github.com/cadenmarinozzi/Schwarzschild-black-hole-simulation/raw/main/assets/sim.gif" />
      <span className="text-2xl">
        The key here is that as a spherical mass (or any other mass) is pulled
        into the black hole, it is being pulled in at different speeds depending
        on its distance from the black hole. Closer matter is pulled in faster,
        and farther matter is pulled in slower. (Even if the object is very very
        small)
      </span>
      <span className="text-2xl">
        Because of this, the matter is stretched out until it is flattened, and
        either enters the event horizon, or orbits around.
      </span>
      <div className="flex flex-row gap-5 items-center">
        <div className="flex flex-col gap-5 items-center">
          <span>Starting object</span>
          <Image src="https://github.com/cadenmarinozzi/Schwarzschild-black-hole-simulation/raw/main/assets/initial.jpg" />
        </div>{" "}
        <FontAwesomeIcon icon={faArrowRight} />
        <div className="flex flex-col gap-5 items-center">
          <span>Object is stretched</span>
          <Image src="https://github.com/cadenmarinozzi/Schwarzschild-black-hole-simulation/raw/main/assets/middle.jpg" />
        </div>
        <FontAwesomeIcon icon={faArrowRight} />
        <div className="flex flex-col gap-5 items-center">
          <span>The mass becomes a disk</span>{" "}
          <Image src="https://github.com/cadenmarinozzi/Schwarzschild-black-hole-simulation/raw/main/assets/result.jpg" />
        </div>
      </div>
      <span className="text-4xl font-bold underline">
        This is the same principle that gives saturn its rings
      </span>
      <div className="divider" />
      <h2 className="text-4xl font-bold">3. Simulating a black hole</h2>
      <span className="text-2xl">
        One of the main fields of study that I have pursued is the science of
        simulating a black hole.{" "}
        <b>
          This is how I have been able to generate all of the images for this
          lesson.
        </b>
      </span>
      <span className="text-2xl">
        Simulating a black hole is no easy task. My simulations have taken over{" "}
        <b>3 years</b> to develop, with thousands of lines of code.
      </span>
      <span className="text-2xl">
        But by the end of this lesson, you will (realistically probably not)
        have the knowledge and information necessary to do so.
      </span>
      <div className="divider" />
      <h2 className="text-4xl font-bold">
        Topic 3. The fundamental equations, and how it works
      </h2>
      <span className="text-2xl">
        The fundamental method of simulating a black hole is to create a
        contained "universe" and simulating the gravity of the objects within
        it.
      </span>
      <span className="text-2xl">
        But you can't just do this with the equations of gravity and motion that
        we have all been taught in our physics classes. These equations are
        simplifications and approximations of gravity at a large scale.
      </span>
      <span className="text-2xl">
        Accurately simulating gravity for such massive objects as a black hole
        requires creating an equation that solves <b>General Relativity</b>
      </span>
      <span className="text-2xl">
        The equation, or "metric", we will be using today is the simplest, the
        Schwrarszchild metric (Shwor-zch-eild).
      </span>
      <Image className="p-4 bg-white" src={Schw} />
      <span className="text-2xl">
        It describes the path of a particle with mass or a massless photon, and
        specifically it's path around a massive object such as a black hole.
      </span>
      <span className="text-2xl">
        So how do we use it to simulate the path of a particle?
      </span>
      <span className="text-2xl">
        We can use a concept from this class that we are all familiar with:{" "}
        <b>The derivative</b>.
      </span>
      <span className="text-2xl">
        If this equation describes the position, then the derivative describes
        the rate of change of the position, aka the velocity.
      </span>
      <span className="text-2xl">
        If we have the velocity of a particle, we can simulate its motion.
      </span>
      <span className="text-2xl">
        Finding the velocity of this metric is <b>quite difficult</b>, but if
        you would like to see how I did it{" "}
        <a
          target="_blank"
          className="text-blue-500"
          href="https://medium.com/@cadenmarinozzi/solving-for-the-numerically-integrable-equations-of-motion-of-the-schwarzschild-metric-09dc9587cd4a"
        >
          Click here
        </a>{" "}
        to see my article on it.
      </span>
      <span className="text-2xl">
        The velocity of the metric turns out to be:
      </span>
      <Image className="p-4 bg-white w-1/2" src={Vel} />
      <span className="text-2xl">Where:</span>
      <div className="flex flex-col items-center">
        <ul className="text-3xl text-left px-20 py-10 border border-base-300 bg-base-200 rounded-3xl shadow-2xl">
          <li>t: time of the universe</li>
          <li>λ: time experienced by the object</li>
          <li>r distance of the object from the center of the black hole</li>
          <li>E: energy of the object</li>
          <li>Rs: schwarzschild radius (We will talk about this later)</li>
          <li>φ: radial position coordinate of the object</li>
          <li>L: angular velocity of the object</li>
          <li>p: second derivative of r</li>
        </ul>
      </div>
      <span className="text-2xl">
        Some of these variables may be confusing. That is because time and
        movement is different when near a black hole, as you might remember from
        the Interstellar movie.
      </span>
      <span className="text-2xl">
        This is also using <b>Spherical coordinates (r, ϴ, φ)</b> instead of the
        regular coordinates we are used to: x and y z. This makes it easier to
        write out and plot the equations as dr and dφ
      </span>
      <span className="text-2xl">
        With these equations of motion, we can simulate the path that light
        takes as it moves near a black hole, or into it:
      </span>
      <span className="text-2xl">
        Try adding an orbit particle and see how it circles around the photon
        ring. Some photons will circle thousands to millions of times.
      </span>
      <BlackHoleSim1 />
      <span className="text-2xl">
        Let's take this up a notch. Creating a 3d environment for the
        simulation, and adding an accretion disk, shows us a more realistic view
        of the black hole.
      </span>
      <BlackHoleSim2 />
      <span className="text-2xl font-bold">Notice something strange?</span>
      <span className="text-2xl">
        The accretion disk <b>doesn't look flat</b>. Why is this?
      </span>
      <span className="text-2xl">
        Take a second to think about a ray of light traveling from the part of
        the accretion disk that is behind the black hole, towards the observer,
        from the top and the bottom.
      </span>
      <Image src={BlackHoleCameraRay} />
      <span className="text-2xl">
        The photon doesn't just go straight into the back of the black hole as
        you would expect. As the ray of light passes by the black hole, it
        curves up and around the black hole, eventually reaching the eye of the
        observer.
      </span>
      <span className="text-2xl">
        This means that no matter what angle you look at the black hole from,
        the top and bottom side of the back side of the black hole is always
        visible.
      </span>
      <span className="text-3xl font-bold">
        So how does this work from a mathematical perspective?
      </span>
      <span className="text-2xl">
        To find the position of something given it's velocity, what do we
        usually do?
      </span>
      <span className="text-2xl">
        We take the integral of it from a start time to an end time.
      </span>
      <span className="text-2xl">
        But the velocity isn't just one equation. It's a bunch of equations that
        interact with eachother for each step, so we can't use a normal integral
        to express the position.
      </span>
      <span className="text-2xl">
        Instead we have to use a technique called <b>numerical integration</b>.
        We've used one version of this technique in class before:{" "}
        <b>Eulers method</b>.
      </span>
      <span className="text-2xl">
        Numerical integration breaks down the process of an integral into tiny
        discrete steps, until the desired solution is reached. It's an
        approximation of the integral.
      </span>
      <Image className="w-1/2" src={RK} />
      <span className="text-2xl">
        By using a method called "Runge Kutta", we can accurately trace the path
        of the particle through time.
      </span>
      <span className="text-2xl">
        Runge Kutta is highly accurate compared to Euler's method, as it breaks
        down a step into smaller, more accurate chunks:
      </span>
      <div className="flex flex-row gap-5 items-center">
        <div className="w-full h-full flex flex-col gap-5 items-center">
          <span>Euler's method</span>
          <Image src={RK} />
        </div>
        <div className="w-full h-full flex flex-col gap-5 items-center">
          <span>Runge Kutta 4th Order</span>
          <Image src={RK444} />
        </div>
      </div>
      <span className="text-2xl">The equation for RK4 is described as:</span>
      <Image
        src="https://2010.igem.org/wiki/images/a/ad/Runge_kutta_eqns.jpg"
        className="p-5 bg-white w-1/2"
      />
      <span className="text-2xl">
        For each step of the simulation, this equation is used to evaluate the
        next value of each part of the velocity, creating a highly accurate
        integration of the particle's position.
      </span>
      <span className="text-2xl">
        Here's a simulation with the step size exaggerated for clarity:
      </span>
      <BlackHoleSim3 />
      <span className="text-2xl">
        Simulating a black hole in 3D requires a bit more though.
      </span>
      <span className="text-2xl">
        It uses a method that most of you have probably heard of:{" "}
        <b>Raytracing</b>.
      </span>
      <span className="text-2xl">
        Because a 3D simulation has <b>depth</b>, we can't just plot the
        position of the particle like on a 2D graph.
      </span>
      <span className="text-2xl">
        We need to step the particle through the scene in 3D, and record the
        position at which it hits the camera.
      </span>
      <span className="text-2xl">
        To do so, we actually do the opposite, we step the particle{" "}
        <b>from the camera</b> out into the scene towards the black hole, that
        way we only shoot <b>one particle per pixel</b>, instead of many
        particles in different directions from some point on the black hole.
      </span>
      <Image src="https://d29g4g2dyqv443.cloudfront.net/sites/default/files/pictures/2018/RayTracing/ray-tracing-image-1.jpg" />
      <span className="text-2xl">
        This ends up looking like this in an expanded observer view:
      </span>
      <Image src={Render} />
      <h2 className="text-4xl font-bold">Topic 4. Making it realistic</h2>
      <span className="text-2xl">
        In order to make the black hole simulation realistic, it requires a deep
        understanding of physics, volume, and light.
      </span>
      <span className="text-2xl">
        To put it into perspective, here's a short list of maybe 1/10th the
        topics required to simulate this black hole:
      </span>
      <Image src={Erik} className="w-1/2" />
      <div className="flex flex-col items-center">
        <ul className="text-3xl text-left px-20 py-10 border border-base-300 bg-base-200 rounded-3xl shadow-2xl">
          <li>Magnetohydrodynamics</li>
          <li>General relativistic raytracing</li>
          <li>Lens projection</li>
          <li>Diffusion</li>
          <li>FFT Convolutional Bloom</li>
          <li>Multiple volumetric scattering</li>
          <li>Doppler effect</li>
          <li>Gravitational shifting</li>
          <li>Volumetric rendering</li>
          <li>Distributed parallel computation</li>
          <li>Special relativity</li>
          <li>Volumetric rendering</li>
          <li>Runge Kutta Fehlberg method</li>
          <li>Vortex noise</li>
          <li>Magnetic field approximation</li>
          <li>Plancks Blackbody Law</li>
          <li>Fractal Brownian Motion</li>
          <li>Radiative transfer</li>
          <li>Blackbody spectrum</li>
          <li>Spherical ray triangle intersection</li>
          <li>Volume sorting</li>
          <li>Optical depth</li>
          <li>Light travel delay</li>
          <li>Accretion wind</li>
          <li>And much much more...</li>
        </ul>
      </div>
      <span className="text-2xl">It takes a lot.</span>
      <span className="text-2xl">And now you are one step closer!</span>
    </div>
  );
};

export default App;
