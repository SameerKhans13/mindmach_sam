
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../../constants';

const RobotAvatar: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Overall body breathing rotation
    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.4) * 0.1;
      group.current.position.y = -1 + Math.sin(time * 0.5) * 0.1;
    }

    // Advanced Hierarchical Arm Movement
    // Shoulder: Primary reach and lift
    if (shoulderRef.current) {
      shoulderRef.current.rotation.z = -0.5 + Math.sin(time * 0.8) * 0.3;
      shoulderRef.current.rotation.x = Math.cos(time * 0.6) * 0.15;
    }

    // Elbow: Out-of-phase flex
    if (elbowRef.current) {
      elbowRef.current.rotation.z = Math.sin(time * 1.2 + 0.5) * 0.6;
    }

    // Wrist: High-frequency stability/vibration
    if (wristRef.current) {
      wristRef.current.rotation.x = Math.sin(time * 2) * 0.2;
      wristRef.current.rotation.y = Math.cos(time * 1.5) * 0.3;
    }

    // Head: Subtle searching behavior
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.3) * 0.4;
      headRef.current.rotation.x = Math.cos(time * 0.4) * 0.2;
    }
  });

  return (
    // @ts-ignore
    <group ref={group} position={[0, -1, 0]} scale={1.1}>
      {/* Base Chassis */}
      {/* @ts-ignore */}
      <mesh position={[0, 0, 0]}>
        {/* @ts-ignore */}
        <cylinderGeometry args={[0.55, 0.75, 2.2, 32]} />
        <MeshDistortMaterial
          color={COLORS.primary}
          speed={1.5}
          distort={0.25}
          wireframe
          opacity={0.6}
          transparent
        />
      {/* @ts-ignore */}
      </mesh>

      {/* Internal Power Core */}
      {/* @ts-ignore */}
      <mesh position={[0, 0, 0]}>
        {/* @ts-ignore */}
        <cylinderGeometry args={[0.2, 0.2, 1.8, 16]} />
        {/* @ts-ignore */}
        <meshStandardMaterial 
          color={COLORS.accent} 
          emissive={COLORS.accent} 
          emissiveIntensity={4} 
          transparent 
          opacity={0.3} 
        />
      {/* @ts-ignore */}
      </mesh>

      {/* Floating Head Assembly */}
      {/* @ts-ignore */}
      <group ref={headRef} position={[0, 1.6, 0]}>
        <Float speed={4} rotationIntensity={1} floatIntensity={1}>
          {/* @ts-ignore */}
          <mesh>
            {/* @ts-ignore */}
            <icosahedronGeometry args={[0.45, 2]} />
            <MeshWobbleMaterial
              color={COLORS.secondary}
              speed={1.5}
              factor={0.4}
              emissive={COLORS.secondary}
              emissiveIntensity={2.5}
            />
          {/* @ts-ignore */}
          </mesh>
          {/* Eye/Sensor Strip */}
          {/* @ts-ignore */}
          <mesh position={[0, 0.1, 0.35]}>
            {/* @ts-ignore */}
            <boxGeometry args={[0.5, 0.05, 0.1]} />
            {/* @ts-ignore */}
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} />
          {/* @ts-ignore */}
          </mesh>
        </Float>
      </group>

      {/* Advanced Kinematic Arm System */}
      {/* SHOULDER JOINT */}
      {/* @ts-ignore */}
      <group ref={shoulderRef} position={[0.6, 0.6, 0]}>
        {/* Shoulder Sphere */}
        {/* @ts-ignore */}
        <mesh>
          {/* @ts-ignore */}
          <sphereGeometry args={[0.22, 16, 16]} />
          {/* @ts-ignore */}
          <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.5} />
        {/* @ts-ignore */}
        </mesh>
        
        {/* UPPER ARM */}
        {/* @ts-ignore */}
        <mesh position={[0.5, 0, 0]}>
          {/* @ts-ignore */}
          <boxGeometry args={[1, 0.12, 0.12]} />
          {/* @ts-ignore */}
          <meshStandardMaterial color={COLORS.primary} metalness={0.8} roughness={0.2} />
        {/* @ts-ignore */}
        </mesh>

        {/* ELBOW JOINT */}
        {/* @ts-ignore */}
        <group ref={elbowRef} position={[1, 0, 0]}>
          {/* @ts-ignore */}
          <mesh>
            {/* @ts-ignore */}
            <sphereGeometry args={[0.15, 12, 12]} />
            {/* @ts-ignore */}
            <meshStandardMaterial color="#888" />
          {/* @ts-ignore */}
          </mesh>

          {/* LOWER ARM */}
          {/* @ts-ignore */}
          <mesh position={[0.4, 0, 0]}>
            {/* @ts-ignore */}
            <boxGeometry args={[0.8, 0.08, 0.08]} />
            {/* @ts-ignore */}
            <meshStandardMaterial color={COLORS.primary} metalness={0.9} />
          {/* @ts-ignore */}
          </mesh>

          {/* WRIST / HAND */}
          {/* @ts-ignore */}
          <group ref={wristRef} position={[0.8, 0, 0]}>
            {/* Wrist Servo */}
            {/* @ts-ignore */}
            <mesh>
              {/* @ts-ignore */}
              <sphereGeometry args={[0.1, 8, 8]} />
              {/* @ts-ignore */}
              <meshStandardMaterial color="#fff" emissive={COLORS.accent} emissiveIntensity={2} />
            {/* @ts-ignore */}
            </mesh>
            
            {/* Hand/Effector Fingers */}
            {/* @ts-ignore */}
            <mesh position={[0.15, 0.05, 0]}>
              {/* @ts-ignore */}
              <boxGeometry args={[0.2, 0.02, 0.02]} />
              {/* @ts-ignore */}
              <meshStandardMaterial color="#fff" />
            {/* @ts-ignore */}
            </mesh>
            {/* @ts-ignore */}
            <mesh position={[0.15, -0.05, 0]}>
              {/* @ts-ignore */}
              <boxGeometry args={[0.2, 0.02, 0.02]} />
              {/* @ts-ignore */}
              <meshStandardMaterial color="#fff" />
            {/* @ts-ignore */}
            </mesh>
          </group>
        </group>
      </group>
      
      {/* Ground Grid Connection */}
      {/* @ts-ignore */}
      <gridHelper args={[12, 12, COLORS.accent, "#0a0a0a"]} position={[0, -1.1, 0]} transparent opacity={0.2} />
    </group>
  );
};

export default RobotAvatar;
