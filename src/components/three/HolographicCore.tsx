import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HolographicCoreProps {
  className?: string;
  size?: 'full' | 'compact';
}

export const HolographicCore: React.FC<HolographicCoreProps> = ({
  className = "w-full h-full min-h-[300px]",
  size = 'full',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.replaceChildren(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x00e5ff, 2.5, 50);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 2, 50);
    purpleLight.position.set(-5, -5, 2);
    scene.add(purpleLight);

    // Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Holographic Shield (Icosahedron)
    const radius = size === 'compact' ? 1.5 : 2;
    const shieldGeo = new THREE.IcosahedronGeometry(radius, 2);
    const shieldMat = new THREE.MeshPhongMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    coreGroup.add(shield);

    // 2. Inner Pulse Core
    const innerGeo = new THREE.SphereGeometry(radius * 0.6, 32, 32);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.35,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.6,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);

    // 3. Orbital Data Rings
    const rings: { mesh: THREE.Mesh; speed: number }[] = [];
    const ringParams = [
      { radius: radius * 1.3, color: 0x00e5ff, speed: 0.01 },
      { radius: radius * 1.5, color: 0x7c3aed, speed: -0.008 },
      { radius: radius * 1.7, color: 0x00e5ff, speed: 0.012 },
    ];

    ringParams.forEach((p) => {
      const ringGeo = new THREE.TorusGeometry(p.radius, 0.015, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: p.color,
        transparent: true,
        opacity: 0.45,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      coreGroup.add(ring);
      rings.push({ mesh: ring, speed: p.speed });
    });

    // 4. Data Streams (Floating Particles)
    const particlesCount = size === 'compact' ? 600 : 1200;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 18;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.65,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    camera.position.z = size === 'compact' ? 6 : 8;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      coreGroup.rotation.y += 0.003;
      shield.rotation.x += 0.001;
      shield.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03);
      innerSphere.scale.setScalar(1 + Math.cos(time * 2) * 0.08);

      rings.forEach((r) => {
        r.mesh.rotation.x += r.speed;
        r.mesh.rotation.y += r.speed * 0.5;
      });

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.position.y = Math.sin(time * 0.4) * 0.3;

      coreGroup.position.x += (mouseX * 0.6 - coreGroup.position.x) * 0.05;
      coreGroup.position.y += (mouseY * 0.6 - coreGroup.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [size]);

  return <div ref={containerRef} className={className} />;
};
