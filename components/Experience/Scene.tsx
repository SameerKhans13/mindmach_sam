
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Stars } from '@react-three/drei';
import ParticleBrain from './ParticleBrain';
import { COLORS } from '../../constants';

interface SceneProps {
  children: React.ReactNode;
}

const Scene: React.FC<SceneProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 11.5], fov: 30 }}
        gl={{ 
          antialias: false, // Disabled for performance gain
          alpha: true, 
          stencil: false, 
          depth: true,
          powerPreference: "high-performance" 
        }}
        dpr={[1, 1.5]} // Capped DPR for mobile speed
        className="pointer-events-auto"
      >
        {/* @ts-ignore */}
        <color attach="background" args={[COLORS.bg]} />
        {/* @ts-ignore */}
        <fog attach="fog" args={[COLORS.bg, 14, 38]} />
        {/* @ts-ignore */}
        <ambientLight intensity={0.8} />
        {/* @ts-ignore */}
        <pointLight position={[25, 25, 25]} intensity={3} color={COLORS.primary} />
        {/* @ts-ignore */}
        <pointLight position={[-25, -25, -25]} intensity={2} color={COLORS.secondary} />
        
        <Stars radius={200} depth={50} count={3000} factor={4} saturation={0} fade speed={0.1} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={7} damping={0.2} horizontal={false} infinite={false}>
            <ParticleBrain />
            <Scroll html>
              <div className="w-screen">
                {children}
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
