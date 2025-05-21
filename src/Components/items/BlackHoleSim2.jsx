import { useEffect, useRef } from "react";
import * as THREE from "three";
import fragmentShader from "./fragmentShader1";
import vertexShader from "./vertexShader1";

export default () => {
  const containerRef = useRef();
  let renderer, camera, canvasMaterial, scene;

  useEffect(() => {
    const container = containerRef.current;
    scene = new THREE.Scene();

    const width = 500; // These can be changed
    const height = 200; // These can be changed
    const aspectRatio = width / height;

    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.borderRadius = "10px";

    function degToRad(deg) {
      return (deg * Math.PI) / 180;
    }

    const fovRadians = degToRad(camera.fov);
    const yFov = camera.position.z * Math.tan(fovRadians / 2) * 2;

    const canvasGeometry = new THREE.PlaneGeometry(yFov * camera.aspect, yFov);

    const spaceTexture = new THREE.TextureLoader().load(
      "/assets/sky4.jpg",
      () => renderer.render(scene, camera)
    );
    spaceTexture.wrapS = spaceTexture.wrapT = THREE.RepeatWrapping;
    spaceTexture.needsUpdate = true;

    canvasMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uSpaceTexture: {
          value: spaceTexture,
        },
        uResolution: {
          value: new THREE.Vector2(width, height),
        },
        uCameraRotation: {
          value: new THREE.Vector2(-0.2, 0),
        },
        uShowAccretionDisk: {
          value: true,
        },
        uAccretionRadius: {
          value: 5,
        },
        uUseRelativity: {
          value: true,
        },
      },
      vertexShader,
      fragmentShader,
    });

    const canvasMesh = new THREE.Mesh(canvasGeometry, canvasMaterial);
    scene.add(canvasMesh);

    let mouseDown = false;

    container.addEventListener("mousedown", () => (mouseDown = true));
    container.addEventListener("mouseup", () => (mouseDown = false));
    container.addEventListener("mousemove", (e) => {
      if (!mouseDown) return;

      (canvasMaterial.uniforms.uCameraRotation.value = new THREE.Vector2(
        (-(e.offsetY - container.getBoundingClientRect().height / 2) * 3) /
          (Math.PI * 180),
        (-(e.offsetX - container.getBoundingClientRect().width / 2) * 3) /
          (Math.PI * 180)
      )),
        renderer.render(scene, camera);
    });

    return () => {
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [containerRef.current]);

  const setShowAccretionDisk = (show) => {
    canvasMaterial.uniforms.uShowAccretionDisk.value = show;
    renderer.render(scene, camera);
  };

  const setAccretionDiskRadius = (radius) => {
    canvasMaterial.uniforms.uAccretionRadius.value = radius;
    renderer.render(scene, camera);
  };

  const setUseRelativity = (user) => {
    canvasMaterial.uniforms.uUseRelativity.value = user;
    renderer.render(scene, camera);
  };

  return (
    <div
      className={`cursor-pointer p-10 bg-base-200 rounded-3xl flex items-center gap-5 flex-col shadow-2xl border border-base-300`}
    >
      <div className="flex flex-row gap-5 items-center">
        <span className="text-2xl">
          Click and drag to rotate the black hole
        </span>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
          <label className="label">
            <input
              type="checkbox"
              defaultChecked
              className="toggle"
              onChange={(e) => {
                setUseRelativity(e.target.checked);
              }}
            />
            <span className="text-black text-lg ">Use relativity</span>
          </label>
        </fieldset>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
          <label className="label">
            <input
              type="checkbox"
              defaultChecked
              className="toggle"
              onChange={(e) => {
                setShowAccretionDisk(e.target.checked);
              }}
            />
            <span className="text-black text-lg ">Show accretion disk</span>
          </label>
        </fieldset>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
          <label className="label flex flex-col items-start gap-1">
            <span className="text-black text-lg ">Accretion disk radius</span>
            <input
              type="range"
              min={2}
              max={15}
              step={1}
              onChange={(e) => setAccretionDiskRadius(e.target.value)}
              className="range"
            />
          </label>
        </fieldset>
      </div>
      <div
        ref={containerRef}
        className={`p-5 bg-white rounded-2xl flex items-center gap-5 flex-col shadow-2xl border border-base-300`}
      ></div>
    </div>
  );
};
