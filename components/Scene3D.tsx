"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Scene3DProps {
  currentSlide: number;
}

const THEMES = {
  0: { particleColor: "#C8A840", particleFrontColor: "#D4B850", robot: "#F5C800", tower: "#3A2E08", sphere: "#5A4A10" },
  1: { particleColor: "#4A8AE8", particleFrontColor: "#5A9AF8", robot: "#3A7BD5", tower: "#0A1A3A", sphere: "#1A3060" },
  2: { particleColor: "#3AAA70", particleFrontColor: "#4ABB80", robot: "#00E87A", tower: "#083A20", sphere: "#0A5A30" },
  3: { particleColor: "#9A6AE8", particleFrontColor: "#AA7AF8", robot: "#A855F7", tower: "#1A0A3A", sphere: "#2A1060" },
  4: { particleColor: "#E86A3A", particleFrontColor: "#F87A4A", robot: "#FF6B35", tower: "#3A1008", sphere: "#5A2010" },
  5: { particleColor: "#3AAABE", particleFrontColor: "#4ABACE", robot: "#00D4FF", tower: "#082A3A", sphere: "#0A4050" },
} as const;

type ThemeKey = keyof typeof THEMES;

// ─── Circle texture helper ────────────────────────────────────────────────────

function makeCircleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

// ─── Wave Particles ───────────────────────────────────────────────────────────

function WaveParticles({ currentSlide }: { currentSlide: number }) {
  const count = 10000;
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const theme = THEMES[currentSlide as ThemeKey] ?? THEMES[0];
  const circleTexture = useMemo(() => makeCircleTexture(), []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = Math.random() * 20 - 14;
    }
    return pos;
  }, []);

  const origins = useMemo(() => {
    const o = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      o[i * 2 + 0] = positions[i * 3 + 0];
      o[i * 2 + 1] = positions[i * 3 + 2];
    }
    return o;
  }, [positions]);

  useEffect(() => {
    if (!geoRef.current) return;
    geoRef.current.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [positions]);

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.color.set(theme.particleColor);
  }, [theme.particleColor]);

  useFrame((state) => {
    if (!geoRef.current) return;
    const attr = geoRef.current.attributes.position as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const x = origins[i * 2 + 0];
      const z = origins[i * 2 + 1];
      arr[i * 3 + 1] =
        Math.sin(x * 0.4 + t * 0.5) * 0.4 +
        Math.sin(z * 0.3 + t * 0.5) * 0.3 +
        Math.sin((x + z) * 0.2 + t * 0.5) * 0.2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial ref={matRef} color={theme.particleColor} size={0.06} transparent opacity={0.85} sizeAttenuation map={circleTexture} alphaMap={circleTexture} alphaTest={0.01} depthWrite={false} />
    </points>
  );
}

// ─── Front Particles ──────────────────────────────────────────────────────────

function FrontParticles({ currentSlide }: { currentSlide: number }) {
  const count = 2000;
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const theme = THEMES[currentSlide as ThemeKey] ?? THEMES[0];
  const circleTexture = useMemo(() => makeCircleTexture(), []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = 2 + Math.random() * 3.5;
    }
    return pos;
  }, []);

  const origins = useMemo(() => {
    const o = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      o[i * 2 + 0] = positions[i * 3 + 0];
      o[i * 2 + 1] = positions[i * 3 + 2];
    }
    return o;
  }, [positions]);

  useEffect(() => {
    if (!geoRef.current) return;
    geoRef.current.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [positions]);

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.color.set(theme.particleFrontColor);
  }, [theme.particleFrontColor]);

  useFrame((state) => {
    if (!geoRef.current) return;
    const attr = geoRef.current.attributes.position as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const x = origins[i * 2 + 0];
      const z = origins[i * 2 + 1];
      arr[i * 3 + 1] =
        Math.sin(x * 0.4 + t * 0.5) * 0.4 +
        Math.sin(z * 0.3 + t * 0.5) * 0.3 +
        Math.sin((x + z) * 0.2 + t * 0.5) * 0.2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial ref={matRef} color={theme.particleFrontColor} size={0.05} transparent opacity={0.6} sizeAttenuation map={circleTexture} alphaMap={circleTexture} alphaTest={0.01} depthWrite={false} />
    </points>
  );
}

// ─── Blueprint Grid ───────────────────────────────────────────────────────────

function BlueprintGridMesh() {
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const vertices = useMemo(() => {
    const verts: number[] = [];
    const size = 12;
    const divisions = 30;
    const step = size / divisions;
    for (let i = 0; i <= divisions; i++) {
      const x = -size / 2 + i * step;
      verts.push(x, -0.9, -size / 2, x, -0.9, size / 2);
    }
    for (let j = 0; j <= divisions; j++) {
      const z = -size / 2 + j * step;
      verts.push(-size / 2, -0.9, z, size / 2, -0.9, z);
    }
    return new Float32Array(verts);
  }, []);

  useEffect(() => {
    if (!geoRef.current) return;
    geoRef.current.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  }, [vertices]);

  return (
    <lineSegments>
      <bufferGeometry ref={geoRef} />
      <lineBasicMaterial color="#1A2535" transparent opacity={0.5} />
    </lineSegments>
  );
}

// ─── Animated Background Towers ───────────────────────────────────────────────

function AnimatedBackground({ currentSlide }: { currentSlide: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const theme = THEMES[currentSlide as ThemeKey] ?? THEMES[0];

  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: theme.tower, wireframe: true, transparent: true, opacity: 0.5 }), [theme.tower]);
  const sphereMat = useMemo(() => new THREE.MeshBasicMaterial({ color: theme.sphere, wireframe: true, transparent: true, opacity: 0.6 }), [theme.sphere]);

  useEffect(() => {
    mat.color.set(theme.tower);
    sphereMat.color.set(theme.sphere);
  }, [mat, sphereMat, theme.tower, theme.sphere]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.15) * 0.12;
  });

  return (
    <group ref={groupRef} position={[-3, 0, -3]}>
      {([0, 1.5, 3] as number[]).map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh material={mat}><boxGeometry args={[0.15, 2.5 + x * 0.3, 0.15]} /></mesh>
          <mesh material={sphereMat} position={[0, 1.2 + x * 0.15, 0]}><sphereGeometry args={[0.1, 8, 8]} /></mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Slide 0: Wireframe Robot (PROTECT) ──────────────────────────────────────

function WireframeRobot({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 }), [color]);
  const bodyMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#1E2530", wireframe: true, transparent: true, opacity: 0.2 }), []);

  useEffect(() => { wireMat.color.set(color); }, [wireMat, color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Same continuous 360 rotation as all other models
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    groupRef.current.position.y = -0.5 + Math.sin(t * 0.6) * 0.12;
  });

  return (
  <group ref={groupRef} position={[-1.4, -0.5, 0]} scale={[1.4, 1.4, 1.4]}>
        {/* Main body chassis */}
      <mesh material={bodyMat}>
        <boxGeometry args={[1.8, 1.2, 2.5]} />
      </mesh>

      {/* Camera device on top — highlighted */}
      <group position={[0, 0.9, -0.3]}>
        <mesh material={wireMat}>
          <boxGeometry args={[0.6, 0.7, 0.5]} />
        </mesh>
        <mesh material={wireMat} position={[0, 0, 0.28]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        </mesh>
        <mesh material={wireMat} position={[0.35, 0, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.4]} />
        </mesh>
        <mesh material={wireMat} position={[-0.35, 0, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.4]} />
        </mesh>
      </group>

      {/* Four wheels */}
      {([-1, 1] as number[]).map((side) =>
        ([-0.9, 0.9] as number[]).map((front) => (
          <mesh
            key={`w-${side}-${front}`}
            material={bodyMat}
            position={[side * 1.1, -0.55, front * 0.9]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.45, 0.45, 0.25, 20]} />
          </mesh>
        ))
      )}

      {/* Arm */}
      <mesh material={wireMat} position={[-0.2, 0.6, 0.2]} rotation={[0.3, 0, 0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
      </mesh>

      {/* Extra detail — sensor dome on top */}
      <mesh material={wireMat} position={[0, 1.4, -0.3]}>
        <sphereGeometry args={[0.18, 10, 10]} />
      </mesh>

      {/* Antenna */}
      <mesh material={wireMat} position={[0.3, 1.5, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
      </mesh>

      {/* Orbital ring around robot */}
      <mesh material={bodyMat} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.012, 6, 48]} />
      </mesh>
    </group>
  );
}
// ─── Slide 1: Satellite Drone (DETECT) ───────────────────────────────────────

function WireframeSatellite({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 }), [color]);
  const dimMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#1E2530", wireframe: true, transparent: true, opacity: 0.2 }), []);

  useEffect(() => { mat.color.set(color); }, [mat, color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
  });

  return (
    <group ref={groupRef} position={[-1, 0, 0]}>
      {/* Central body */}
      <mesh material={mat}><boxGeometry args={[0.6, 0.6, 0.6]} /></mesh>
      {/* Solar panels left */}
      <mesh material={mat} position={[-1.2, 0, 0]}><boxGeometry args={[1.2, 0.05, 0.5]} /></mesh>
      <mesh material={dimMat} position={[-1.2, 0, 0]}><boxGeometry args={[1.1, 0.04, 0.45]} /></mesh>
      {/* Solar panels right */}
      <mesh material={mat} position={[1.2, 0, 0]}><boxGeometry args={[1.2, 0.05, 0.5]} /></mesh>
      <mesh material={dimMat} position={[1.2, 0, 0]}><boxGeometry args={[1.1, 0.04, 0.45]} /></mesh>
      {/* Antenna */}
      <mesh material={mat} position={[0, 0.6, 0]}><cylinderGeometry args={[0.02, 0.02, 0.6, 8]} /></mesh>
      <mesh material={mat} position={[0, 0.95, 0]}><sphereGeometry args={[0.08, 8, 8]} /></mesh>
      {/* Dish */}
      <mesh material={mat} position={[0, -0.5, 0]} rotation={[Math.PI / 4, 0, 0]}><cylinderGeometry args={[0.3, 0.05, 0.2, 12]} /></mesh>
      {/* Orbital ring */}
      <mesh material={dimMat} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.5, 0.01, 8, 48]} /></mesh>
    </group>
  );
}

// ─── Slide 2: Data Tower (MONITOR) ───────────────────────────────────────────

function WireframeDataTower({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 }), [color]);
  const dimMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#1E2530", wireframe: true, transparent: true, opacity: 0.25 }), []);

  useEffect(() => { mat.color.set(color); }, [mat, color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef} position={[-1, -0.3, 0]}>
      {/* Base platform */}
      <mesh material={dimMat}><cylinderGeometry args={[0.8, 1.0, 0.1, 8]} /></mesh>
      {/* Main tower */}
      <mesh material={mat} position={[0, 0.8, 0]}><cylinderGeometry args={[0.08, 0.15, 1.6, 6]} /></mesh>
      {/* Rings around tower */}
      {[0.3, 0.7, 1.1].map((y) => (
        <mesh key={y} material={mat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35 - y * 0.05, 0.015, 6, 24]} />
        </mesh>
      ))}
      {/* Top dish */}
      <mesh material={mat} position={[0, 1.65, 0]}><coneGeometry args={[0.3, 0.3, 8]} /></mesh>
      {/* Strut legs */}
      {([0, 1, 2, 3] as number[]).map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} material={dimMat} position={[Math.cos(angle) * 0.6, 0.2, Math.sin(angle) * 0.6]} rotation={[0, 0, Math.PI / 5]}>
            <cylinderGeometry args={[0.02, 0.02, 0.7, 4]} />
          </mesh>
        );
      })}
      {/* Floating data cubes */}
      {([0, 1, 2] as number[]).map((i) => (
        <mesh key={`cube-${i}`} material={mat} position={[Math.cos(i * 2.1) * 1.1, 0.5 + i * 0.3, Math.sin(i * 2.1) * 1.1]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Slide 3: Crystal Analyzer (ANALYZE) ─────────────────────────────────────

function WireframeCrystal({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 }), [color]);
  const dimMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#2A1060", wireframe: true, transparent: true, opacity: 0.3 }), []);

  useEffect(() => { mat.color.set(color); }, [mat, color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.35;
    groupRef.current.rotation.x = t * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={[-0.8, 0, 0]}>
      {/* Central octahedron */}
      <mesh material={mat}><octahedronGeometry args={[0.6, 0]} /></mesh>
      {/* Outer cage */}
      <mesh material={dimMat}><octahedronGeometry args={[1.0, 0]} /></mesh>
      {/* Orbiting tetrahedra */}
      {([0, 1, 2] as number[]).map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh key={i} material={mat} position={[Math.cos(angle) * 1.2, Math.sin(angle * 0.5) * 0.3, Math.sin(angle) * 1.2]}>
            <tetrahedronGeometry args={[0.18, 0]} />
          </mesh>
        );
      })}
      {/* Equatorial ring */}
      <mesh material={mat} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.015, 6, 36]} />
      </mesh>
      {/* Vertical rings */}
      <mesh material={dimMat}><torusGeometry args={[1.3, 0.01, 6, 36]} /></mesh>
      <mesh material={dimMat} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[1.3, 0.01, 6, 36]} /></mesh>
    </group>
  );
}

// ─── Slide 4: Shield (RESPOND) ────────────────────────────────────────────────

function WireframeShield({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 }), [color]);
  const dimMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#3A1008", wireframe: true, transparent: true, opacity: 0.3 }), []);

  useEffect(() => { mat.color.set(color); }, [mat, color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4;
    groupRef.current.position.y = Math.sin(t * 0.45) * 0.1;
  });

  return (
    <group ref={groupRef} position={[-1, 0, 0]}>
      {/* Shield body layers */}
      <mesh material={mat}><cylinderGeometry args={[0.7, 0.9, 0.1, 6]} /></mesh>
      <mesh material={mat} position={[0, 0.2, 0]}><cylinderGeometry args={[0.6, 0.7, 0.1, 6]} /></mesh>
      <mesh material={mat} position={[0, 0.4, 0]}><cylinderGeometry args={[0.45, 0.6, 0.1, 6]} /></mesh>
      <mesh material={mat} position={[0, 0.6, 0]}><cylinderGeometry args={[0.28, 0.45, 0.1, 6]} /></mesh>
      <mesh material={mat} position={[0, 0.75, 0]}><coneGeometry args={[0.28, 0.3, 6]} /></mesh>
      {/* Outer pulse rings */}
      {[1.1, 1.5, 1.9].map((r) => (
        <mesh key={r} material={dimMat} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.012, 6, 36]} />
        </mesh>
      ))}
      {/* Corner spikes */}
      {([0, 1, 2, 3, 4, 5] as number[]).map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} material={mat} position={[Math.cos(angle) * 0.95, 0, Math.sin(angle) * 0.95]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.04, 0.25, 4]} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── Slide 5: DNA Helix (EVOLVE) ─────────────────────────────────────────────

function WireframeHelix({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 }), [color]);
  const dimMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#0A4050", wireframe: true, transparent: true, opacity: 0.3 }), []);

  useEffect(() => { mat.color.set(color); }, [mat, color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.1;
  });

  const steps = 18;
  const helixRadius = 0.45;
  const helixHeight = 2.4;

  return (
    <group ref={groupRef} position={[-1, -1.0, 0]}>
      {Array.from({ length: steps }).map((_, i) => {
        const t = i / steps;
        const angle1 = t * Math.PI * 4;
        const angle2 = angle1 + Math.PI;
        const y = t * helixHeight - helixHeight / 2;

        const x1 = Math.cos(angle1) * helixRadius;
        const z1 = Math.sin(angle1) * helixRadius;
        const x2 = Math.cos(angle2) * helixRadius;
        const z2 = Math.sin(angle2) * helixRadius;

        return (
          <group key={i}>
            {/* Strand 1 node */}
            <mesh material={mat} position={[x1, y, z1]}>
              <sphereGeometry args={[0.06, 6, 6]} />
            </mesh>
            {/* Strand 2 node */}
            <mesh material={mat} position={[x2, y, z2]}>
              <sphereGeometry args={[0.06, 6, 6]} />
            </mesh>
            {/* Cross rung every other step */}
            {i % 2 === 0 && (
              <mesh material={dimMat} position={[(x1 + x2) / 2, y, (z1 + z2) / 2]}>
                <cylinderGeometry args={[0.015, 0.015, helixRadius * 2, 4]} />
              </mesh>
            )}
          </group>
        );
      })}
      {/* Outer cage cylinder */}
      <mesh material={dimMat}><cylinderGeometry args={[0.7, 0.7, helixHeight, 12, 1, true]} /></mesh>
    </group>
  );
}

// ─── Scene switcher ───────────────────────────────────────────────────────────

function SceneModel({ currentSlide }: { currentSlide: number }) {
  const theme = THEMES[currentSlide as ThemeKey] ?? THEMES[0];
  const color = theme.robot;

  switch (currentSlide) {
    case 0: return <WireframeRobot color={color} />;
    case 1: return <WireframeSatellite color={color} />;
    case 2: return <WireframeDataTower color={color} />;
    case 3: return <WireframeCrystal color={color} />;
    case 4: return <WireframeShield color={color} />;
    case 5: return <WireframeHelix color={color} />;
    default: return <WireframeRobot color={color} />;
  }
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Scene3D({ currentSlide }: Scene3DProps) {
  const theme = THEMES[currentSlide as ThemeKey] ?? THEMES[0];

  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[2, 3, 2]} intensity={0.5} color={theme.robot} />
      <pointLight position={[-3, 1, -2]} intensity={0.3} color="#1A2A4A" />

      <WaveParticles currentSlide={currentSlide} />
      <FrontParticles currentSlide={currentSlide} />
      <BlueprintGridMesh />
      <AnimatedBackground currentSlide={currentSlide} />
      <SceneModel currentSlide={currentSlide} />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}