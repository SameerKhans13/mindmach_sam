
import React from 'react';
import Scene from './components/Experience/Scene';
import NeuralVisualizer from './components/UI/NeuralVisualizer';
import DecoderConsole from './components/UI/DecoderConsole';
import { TEAM } from './constants';

const App: React.FC = () => {
  return (
    <main className="bg-[#050505] text-white selection:bg-primary/30 min-h-screen font-sans">
      <Scene>
        {/* SECTION 1: HERO - THE VISION */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="max-w-4xl mt-12">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-transparent"></div>
               <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] animate-pulse">
                System Status: Synchronized
               </span>
            </div>
            <h1 className="text-8xl md:text-[10rem] font-black mb-6 leading-[0.8] uppercase tracking-tighter">
              MIND<br />
              <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent italic">
                MACH
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed mb-10 max-w-2xl font-light">
              The ultimate bridge between human intent and robotic execution. By capturing <strong>EMG signals</strong>, MindMach allows robots to mirror user motions and anticipate their next move with zero cognitive friction.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="group relative px-12 py-5 bg-white text-black font-black text-xs rounded-full overflow-hidden transition-all uppercase tracking-widest">
                <span className="relative z-10">Initialize Link</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <button className="px-12 py-5 border border-white/10 font-black text-xs rounded-full hover:bg-white/5 transition-all uppercase tracking-widest backdrop-blur-sm">
                View Architecture
              </button>
            </div>
          </div>
          <div className="mt-auto mb-16 flex items-center justify-between text-primary/40 text-[9px] tracking-[0.6em] uppercase font-mono">
            <div className="flex items-center gap-3">
              <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
              NEURAL STREAM ACTIVE
            </div>
            <div className="hidden md:block opacity-50">TX: 4.2 GBPS | RX: 0.1 MS</div>
          </div>
        </section>

        {/* SECTION 2: SENSING LAYER (WEARABLES) */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-2">
                <span className="text-primary font-mono text-xs tracking-widest uppercase">Phase 01</span>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                  Sensing<br/><span className="text-white/20">Layer</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <div className="group p-6 border-l-4 border-primary/20 hover:border-primary transition-colors bg-white/[0.02]">
                  <h4 className="text-xl font-black uppercase text-white mb-2 tracking-tight">EMG Wearables</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    High-density EMG Gloves measure forearm electrical potential. Even without full closure, sensors detect microscopic finger movements for high-fidelity control.
                  </p>
                </div>
                <div className="group p-6 border-l-4 border-white/5 hover:border-secondary transition-colors bg-white/[0.01]">
                  <h4 className="text-xl font-black uppercase text-white mb-2 tracking-tight">Smart Optics & SLAM</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    Hats and glasses integrated with Visual SLAM (Simultaneous Localization and Mapping). The robot sees exactly what you see, aligning perspectives instantly.
                  </p>
                </div>
                <div className="group p-6 border-l-4 border-white/5 hover:border-accent transition-colors bg-white/[0.01]">
                  <h4 className="text-xl font-black uppercase text-white mb-2 tracking-tight">IMU Fusion</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    Gyroscopes and accelerometers (IMUs) combined with EMG to track limb position in absolute 3D space, ensuring 1:1 kinematic mapping.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <NeuralVisualizer />
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
                  <div className="text-3xl font-black text-white">10bit</div>
                  <div className="text-[10px] uppercase text-gray-500 tracking-widest mt-1">Quantization</div>
                </div>
                <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10">
                  <div className="text-3xl font-black text-white">8-CH</div>
                  <div className="text-[10px] uppercase text-gray-500 tracking-widest mt-1">Sensor Density</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROCESSING LAYER (THE MIND) */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="order-2 lg:order-1 flex justify-center">
                <DecoderConsole />
             </div>
             <div className="order-1 lg:order-2 space-y-10">
                <div className="space-y-2">
                  <span className="text-secondary font-mono text-xs tracking-widest uppercase">Phase 02</span>
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                    Processing<br/><span className="bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent italic">The Mind</span>
                  </h2>
                </div>
                <p className="text-gray-400 text-xl font-light leading-relaxed">
                  Raw EMG data is a sea of noise. MindMach utilizes a sophisticated signal pipeline to distill intent from electrical chaos.
                </p>
                <ul className="space-y-4 font-mono text-xs text-gray-500">
                  <li className="flex items-center gap-3">
                    <span className="text-secondary">01</span> DE-NOISING: REMOVING POWER LINE INTERFERENCE
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-secondary">02</span> PATTERN RECOGNITION: CNN/LSTM GESTURE EXTRACTION
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-secondary">03</span> KINEMATIC SOLVER: MAPPING INTENT TO ROBOT IK
                  </li>
                </ul>
             </div>
          </div>
        </section>

        {/* SECTION 4: ACTUATION LAYER */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-10">
                <div className="space-y-2">
                  <span className="text-accent font-mono text-xs tracking-widest uppercase">Phase 03</span>
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                    Actuation<br/><span className="text-white/20">Layer</span>
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="group">
                    <h4 className="text-2xl font-black uppercase mb-3 flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      End-Effectors
                    </h4>
                    <p className="text-gray-500 font-light leading-relaxed">
                      Specialized grippers engineered for the task—from handling fragile saplings with sub-gram force to managing high-pressure hoses.
                    </p>
                  </div>
                  <div className="group">
                    <h4 className="text-2xl font-black uppercase mb-3 flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Latency Logic
                    </h4>
                    <p className="text-gray-500 font-light leading-relaxed">
                      A critical 100-150ms window. Our system optimizes every packet to ensure that the robot feels like a natural extension of your own body.
                    </p>
                  </div>
                </div>
             </div>
             <div className="relative">
                <div className="absolute -inset-10 bg-accent/10 blur-[100px] rounded-full"></div>
                <div className="relative p-12 border border-white/5 bg-black/40 backdrop-blur-3xl rounded-[60px] overflow-hidden">
                   <div className="text-[10px] text-accent font-bold uppercase mb-8 tracking-[0.4em]">Real-time Telemetry</div>
                   <div className="space-y-8">
                      {['Force Feedback', 'Kinematic Drift', 'Signal Fidelity'].map((stat, i) => (
                        <div key={stat} className="space-y-3">
                          <div className="flex justify-between items-end">
                            <span className="text-xs text-gray-400 uppercase tracking-widest">{stat}</span>
                            <span className="text-sm font-mono text-white">{90 + i * 2}.{i * 3}%</span>
                          </div>
                          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-accent" style={{ width: `${90 + i * 2}%` }} />
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* SECTION 5: THE GARDENING CASE STUDY */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
              Use Case: <span className="text-primary">Gardening</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto font-light">Breaking down the workflow of horticultural teleoperation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                step: 'Selection', 
                human: 'You gaze at the watering can through eye-tracking optics.', 
                robot: 'Robot identifies object & highlights via shared HUD.' 
              },
              { 
                step: 'Grip', 
                human: 'You contract your hand muscles naturally.', 
                robot: 'EMG detected. Robot closes gripper with proportional force.' 
              },
              { 
                step: 'Motion', 
                human: 'You tilt your forearm as if pouring water.', 
                robot: 'IK solver calculates safe pouring angles instantly.' 
              }
            ].map((item, i) => (
              <div key={i} className="p-10 border border-white/5 bg-white/[0.02] rounded-[40px] group hover:bg-white/[0.04] transition-all">
                <div className="text-primary font-mono text-xs mb-6 font-bold uppercase tracking-widest">Step 0{i+1}</div>
                <h4 className="text-3xl font-black uppercase mb-6 tracking-tight group-hover:text-primary transition-colors">{item.step}</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] text-gray-600 uppercase mb-1 font-bold">Human</div>
                    <p className="text-sm text-gray-400 italic">"{item.human}"</p>
                  </div>
                  <div className="w-8 h-[1px] bg-white/10"></div>
                  <div>
                    <div className="text-[10px] text-primary uppercase mb-1 font-bold">Robot</div>
                    <p className="text-sm text-gray-300 font-light">{item.robot}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: CHALLENGES & BUSINESS IMPACT */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Challenges</h2>
              <div className="space-y-10">
                {[
                  { q: 'Muscle Fatigue', a: 'EMG signals drift as humans tire. Our AI uses adaptive calibration to re-sync in real-time.' },
                  { q: 'Governor Safety', a: 'Safety "governors" smooth out jerky human movements to protect the robot and surroundings.' },
                  { q: 'Data Bandwidth', a: 'High-fidelity EMG requires 5G/Wi-Fi 6 to maintain sub-150ms latency.' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h5 className="text-primary font-bold uppercase text-xs tracking-widest">0{i+1} // {item.q}</h5>
                    <p className="text-gray-500 font-light leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Market Sectors</h2>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: 'Hazardous Environments', desc: 'Remote handling of chemical or radioactive waste via human-mirroring.' },
                  { title: 'Tele-Surgery', desc: 'Scaling human gestures down for ultra-precise micro-medical procedures.' },
                  { title: 'Heavy Machinery', desc: 'Operating massive excavators with the intuitive feel of a human hand.' }
                ].map((item, i) => (
                  <div key={i} className="group p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:border-primary/40 transition-all flex justify-between items-center">
                    <div>
                      <h6 className="text-lg font-black uppercase mb-1 tracking-tight">{item.title}</h6>
                      <p className="text-gray-600 text-xs font-light">{item.desc}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                      <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: THE ARCHITECTS */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
              The <span className="text-primary italic">Architects</span>
            </h2>
            <div className="h-[1px] flex-grow mx-12 bg-white/10 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, index) => (
              <div 
                key={index} 
                className="group relative bg-white/[0.02] border border-white/5 p-12 rounded-[50px] backdrop-blur-3xl hover:bg-white/[0.04] hover:border-primary/40 transition-all duration-700"
              >
                <div className="absolute top-10 right-10 text-white/5 font-black text-8xl select-none group-hover:text-primary/10 transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-3xl font-black mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">
                  {member.name}
                </h3>
                <div className="text-primary/60 font-mono text-[10px] uppercase tracking-[0.4em] mb-8 font-bold">
                  {member.role}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="h-[400px] flex flex-col items-center justify-center border-t border-white/5 bg-[#030303] text-center px-6">
          <div className="text-white font-black text-4xl md:text-6xl tracking-[0.5em] mb-6 uppercase">MINDMACH</div>
          <p className="text-gray-600 text-[10px] tracking-[1em] uppercase mb-12">
            HRI CONVERGENCE DIV © 2025 :: ALL SYSTEMS NOMINAL
          </p>
          <div className="flex gap-10 text-white/20 text-xs font-mono">
            <span>5G: ACTIVE</span>
            <span>EMG: STABLE</span>
            <span>IK: LOCKED</span>
          </div>
        </footer>
      </Scene>
    </main>
  );
};

export default App;
