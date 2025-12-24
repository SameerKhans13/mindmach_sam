
import React, { useEffect, useRef } from 'react';
import { COLORS } from '../../constants';

const NeuralVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    const channelCount = 8;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const channelHeight = height / channelCount;

      for (let i = 0; i < channelCount; i++) {
        const yBase = i * channelHeight + channelHeight / 2;
        
        // Channel background
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        ctx.lineTo(width, yBase);
        ctx.stroke();

        // Label
        ctx.fillStyle = i === 0 ? COLORS.primary : 'rgba(255, 255, 255, 0.3)';
        ctx.font = '6px monospace';
        ctx.fillText(`CH-0${i + 1}`, 5, yBase - 8);

        // Signal Wave
        ctx.strokeStyle = i % 2 === 0 ? COLORS.primary : COLORS.secondary;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();

        const amplitude = 12 + Math.sin(offset * 0.2 + i) * 5;
        const frequency = 0.04 + (i * 0.005);

        for (let x = 0; x < width; x += 2) {
          const noise = (Math.random() - 0.5) * 4;
          const y = yBase + 
            Math.sin(x * frequency + offset + i) * amplitude + 
            Math.sin(x * frequency * 2.5 + offset * 1.5) * (amplitude / 3) +
            noise;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      offset += 0.2;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="bg-black/60 border border-white/10 rounded-xl p-4 backdrop-blur-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
           <span className="text-[10px] uppercase tracking-widest text-primary font-bold">MINDMACH INTERFACE (SENSING LAYER)</span>
           <span className="text-[8px] text-gray-500 font-mono tracking-tighter">BITRATE: 4.2 GBPS | FIDELITY: 99.8%</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="text-[8px] font-mono text-primary animate-pulse">SENSORS ONLINE</div>
           <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00d2ff]"></div>
        </div>
      </div>
      <canvas ref={canvasRef} width={600} height={200} className="w-full h-48 opacity-90" />
      <div className="grid grid-cols-4 mt-3 pt-3 border-t border-white/5 text-[7px] text-gray-600 font-mono uppercase tracking-widest">
        <div>Filter: High-Pass</div>
        <div>Gain: 40dB</div>
        <div>Latency: 2ms</div>
        <div className="text-right">Sync: Locked</div>
      </div>
    </div>
  );
};

export default NeuralVisualizer;
