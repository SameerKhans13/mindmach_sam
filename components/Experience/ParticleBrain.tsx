
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { PARTICLE_COUNT, COLORS } from '../../constants';

const ParticleBrain: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const { synapticPositions, explodedPositions, chipPositions, colors, particleSeeds } = useMemo(() => {
    const synPos = new Float32Array(PARTICLE_COUNT * 3);
    const expPos = new Float32Array(PARTICLE_COUNT * 3);
    const chipPos = new Float32Array(PARTICLE_COUNT * 3);
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT);

    const color1 = new THREE.Color(COLORS.primary);
    const color2 = new THREE.Color(COLORS.secondary);
    const gridDim = Math.ceil(Math.sqrt(PARTICLE_COUNT));

    const hubCount = 20; // Reduced for speed
    const hubs = Array.from({ length: hubCount }, (_, i) => {
      const isLeft = i < hubCount / 2;
      return {
        pos: new THREE.Vector3(
          (isLeft ? -1.8 : 1.8) + (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 5.5,
          (Math.random() - 0.5) * 4.5
        ),
        radius: 0.15 + Math.random() * 0.95,
        isLeft
      };
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      seeds[i] = Math.random(); 

      let x, y, z;
      const type = Math.random();
      const hub = hubs[Math.floor(Math.random() * hubCount)];

      if (type < 0.75) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.pow(Math.random(), 2.2) * hub.radius; 
        x = hub.pos.x + r * Math.sin(phi) * Math.cos(theta);
        y = hub.pos.y + r * Math.sin(phi) * Math.sin(theta) * 1.5;
        z = hub.pos.z + r * Math.cos(phi);
      } else {
        const targetHub = hubs[Math.floor(Math.random() * hubCount)];
        const t = Math.random();
        x = THREE.MathUtils.lerp(hub.pos.x, targetHub.pos.x, t) + (Math.random() - 0.5) * 0.15;
        y = THREE.MathUtils.lerp(hub.pos.y, targetHub.pos.y, t) + (Math.random() - 0.5) * 0.15;
        z = THREE.MathUtils.lerp(hub.pos.z, targetHub.pos.z, t) + (Math.random() - 0.5) * 0.15;
      }

      synPos[i3] = x;
      synPos[i3 + 1] = y;
      synPos[i3 + 2] = z;

      const u = Math.random() * 2 * Math.PI;
      const v = Math.acos(2 * Math.random() - 1);
      const radius = 28 + Math.random() * 45;
      expPos[i3] = radius * Math.sin(v) * Math.cos(u);
      expPos[i3 + 1] = radius * Math.sin(v) * Math.sin(u);
      expPos[i3 + 2] = radius * Math.cos(v);

      const row = Math.floor(i / gridDim);
      const col = i % gridDim;
      const chipSize = 14;
      const isCircuit = (row % 18 === 0 || col % 18 === 0);
      chipPos[i3] = (col / gridDim - 0.5) * chipSize;
      chipPos[i3 + 1] = (row / gridDim - 0.5) * chipSize;
      chipPos[i3 + 2] = isCircuit ? 0.75 : (Math.random() - 0.5) * 0.04;

      const dist = Math.sqrt(x*x + y*y + z*z);
      const baseCol = color1.clone().lerp(color2, dist / 8);
      if (seeds[i] > 0.985) baseCol.set(0xffffff);
      cols[i3] = baseCol.r;
      cols[i3 + 1] = baseCol.g;
      cols[i3 + 2] = baseCol.b;
    }

    return { synapticPositions: synPos, explodedPositions: expPos, chipPositions: chipPos, colors: cols, particleSeeds: seeds };
  }, []);

  const coreColors = useMemo(() => colors.slice(), [colors]);
  const glowPositions = useMemo(() => synapticPositions.slice(), [synapticPositions]);

  useFrame((state) => {
    if (!coreRef.current || !glowRef.current || !groupRef.current) return;
    
    const offset = scroll.offset; 
    const corePosAttr = coreRef.current.geometry.attributes.position;
    const glowPosAttr = glowRef.current.geometry.attributes.position;
    const coreColorAttr = coreRef.current.geometry.attributes.color;
    const time = state.clock.getElapsedTime();

    const smooth = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let targetX, targetY, targetZ;
      const seed = particleSeeds[i];

      let bX = synapticPositions[i3];
      let bY = synapticPositions[i3 + 1];
      let bZ = synapticPositions[i3 + 2];
      
      const pulse = Math.sin(time * 0.6 + seed * 15) * 0.06;
      bX += pulse;
      bY += pulse * 1.2;

      if (offset < 0.28) {
        const t = offset / 0.28;
        const easedT = smooth(t);
        const burst = Math.sin(t * Math.PI) * 12 * seed; 
        const dirX = bX; const dirY = bY; const dirZ = bZ;
        const mag = Math.sqrt(dirX*dirX + dirY*dirY + dirZ*dirZ) || 1;

        targetX = THREE.MathUtils.lerp(bX, explodedPositions[i3], easedT) + (dirX/mag) * burst;
        targetY = THREE.MathUtils.lerp(bY, explodedPositions[i3+1], easedT) + (dirY/mag) * burst;
        targetZ = THREE.MathUtils.lerp(bZ, explodedPositions[i3+2], easedT) + (dirZ/mag) * burst;

        const flash = Math.pow(Math.sin(t * Math.PI), 3);
        if (flash > 0.01) {
          coreColorAttr.array[i3] = THREE.MathUtils.lerp(colors[i3], 1.0, flash);
          coreColorAttr.array[i3+1] = THREE.MathUtils.lerp(colors[i3+1], 1.0, flash);
          coreColorAttr.array[i3+2] = THREE.MathUtils.lerp(colors[i3+2], 1.0, flash);
        } else {
          coreColorAttr.array[i3] = colors[i3];
          coreColorAttr.array[i3+1] = colors[i3+1];
          coreColorAttr.array[i3+2] = colors[i3+2];
        }
      } else if (offset < 0.45) {
        targetX = explodedPositions[i3];
        targetY = explodedPositions[i3 + 1];
        targetZ = explodedPositions[i3 + 2];
        coreColorAttr.array[i3] = colors[i3];
        coreColorAttr.array[i3+1] = colors[i3+1];
        coreColorAttr.array[i3+2] = colors[i3+2];
      } else {
        const t = (offset - 0.45) / 0.55;
        const easedT = 1 - Math.pow(1 - t, 6);
        targetX = THREE.MathUtils.lerp(explodedPositions[i3], chipPositions[i3], easedT);
        targetY = THREE.MathUtils.lerp(explodedPositions[i3 + 1], chipPositions[i3 + 1], easedT);
        targetZ = THREE.MathUtils.lerp(explodedPositions[i3 + 2], chipPositions[i3 + 2], easedT);
      }

      corePosAttr.array[i3] = targetX;
      corePosAttr.array[i3 + 1] = targetY;
      corePosAttr.array[i3 + 2] = targetZ;

      const lag = 0.88;
      glowPosAttr.array[i3] = THREE.MathUtils.lerp(glowPosAttr.array[i3], targetX, lag);
      glowPosAttr.array[i3 + 1] = THREE.MathUtils.lerp(glowPosAttr.array[i3 + 1], targetY, lag);
      glowPosAttr.array[i3 + 2] = THREE.MathUtils.lerp(glowPosAttr.array[i3 + 2], targetZ, lag);
    }

    corePosAttr.needsUpdate = true;
    glowPosAttr.needsUpdate = true;
    coreColorAttr.needsUpdate = true;

    groupRef.current.rotation.y = time * 0.12;
    if (offset > 0.3) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.4, 0.04);
    }
  });

  return (
    <group ref={groupRef}>
      {/* @ts-ignore */}
      <points ref={coreRef}>
        {/* @ts-ignore */}
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={synapticPositions} itemSize={3} />
          {/* @ts-ignore */}
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={coreColors} itemSize={3} />
        {/* @ts-ignore */}
        </bufferGeometry>
        {/* @ts-ignore */}
        <pointsMaterial size={0.018} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation={true} />
      {/* @ts-ignore */}
      </points>
      {/* @ts-ignore */}
      <points ref={glowRef}>
        {/* @ts-ignore */}
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={glowPositions} itemSize={3} />
          {/* @ts-ignore */}
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
        {/* @ts-ignore */}
        </bufferGeometry>
        {/* @ts-ignore */}
        <pointsMaterial size={0.07} vertexColors transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation={true} />
      {/* @ts-ignore */}
      </points>
    </group>
  );
};

export default ParticleBrain;
