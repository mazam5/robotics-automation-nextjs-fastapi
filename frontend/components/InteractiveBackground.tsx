"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const speed = 0.01 + Math.random() * 0.02;
      temp.push({ x, y, z, speed, initialY: y });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      particle.y += particle.speed;
      if (particle.y > 10) particle.y = -10;
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.rotation.x = particle.y * 0.5;
      dummy.rotation.y = particle.x * 0.5;
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.08, 0]} />
      <meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} roughness={0} metalness={0.5} />
    </instancedMesh>
  );
}

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, -10]} intensity={0.5} angle={0.2} penumbra={1} />
        <Particles count={700} />
      </Canvas>
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80"></div>
    </div>
  );
}
