"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function ThreeModelViewer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    /* ---------------- Scene ---------------- */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    /* ---------------- Camera ---------------- */
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 3);

    /* ---------------- Renderer ---------------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    /* ---------------- Lights ---------------- */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    /* ---------------- Controls ---------------- */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;


    const rgbeLoader = new RGBELoader();

rgbeLoader.load("/images/hdr/brown_photostudio_02_2k.hdr", (hdrTexture) => {
  hdrTexture.mapping = THREE.EquirectangularReflectionMapping;

  scene.environment = hdrTexture; // for lighting + reflections
  scene.background = hdrTexture;  // optional (for visible background)
});


    const texturemap = new THREE.TextureLoader().load("/images/fabric/454515 (1).jpg");
    texturemap.wrapS = THREE.RepeatWrapping;
    texturemap.wrapT = THREE.RepeatWrapping;
    texturemap.repeat.set(12, 12);
    texturemap.colorSpace = THREE.SRGBColorSpace;

    /* ---------------- Load GLTF Model ---------------- */
    const loader = new GLTFLoader();
    loader.load(
      "/glb/sh1.glb", // 👈 your model path (public folder)
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.map = texturemap;
            child.material.needsUpdate = true;
            child.material.side = THREE.DoubleSide;
          }
        });
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("GLTF load error:", error);
      }
    );

    /* ---------------- Animation Loop ---------------- */
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    /* ---------------- Resize Handling ---------------- */
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    /* ---------------- Cleanup ---------------- */
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    />
  );
}
