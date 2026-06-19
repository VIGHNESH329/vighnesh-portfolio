'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useIdentityStore } from '@/store/useIdentityStore';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

function generateParticles(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function CyberParticles() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => generateParticles(5000, 10), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#39ff14" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
      <Points positions={generateParticles(2000, 12)} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ff4500" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>
    </group>
  );
}

function SDEParticles() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => generateParticles(6000, 12), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 25;
      ref.current.rotation.y += delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, -Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#3b82f6" size={0.04} sizeAttenuation={true} depthWrite={false} opacity={0.5} />
      </Points>
      <Points positions={generateParticles(2000, 10)} stride={3} frustumCulled={false}>
         <PointMaterial transparent color="#a855f7" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
      </Points>
    </group>
  );
}

export default function BackgroundCanvas() {
  const { activeIdentity } = useIdentityStore();
  const isCyber = activeIdentity === 'cyber';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Suspense fallback={null}>
          {isCyber ? <CyberParticles /> : <SDEParticles />}
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/90 to-background" />
    </div>
  );
}
