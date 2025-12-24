
import React, { useState } from 'react';
import { decodeNeuralSignal } from '../../services/geminiService';

const DecoderConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDecode = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await decodeNeuralSignal(input);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="bg-black/60 border border-white/10 p-6 rounded-2xl backdrop-blur-xl max-w-md w-full">
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Neural Intent Decoder
      </h3>
      <p className="text-sm text-gray-400 mb-4 font-light">
        Enter a movement intent (e.g., "Raise left arm and rotate wrist") to see how the Gemini neural model translates it to hardware commands.
      </p>
      
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe human intent..."
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px]"
        />
        
        <button
          onClick={handleDecode}
          disabled={loading || !input}
          className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-lg font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          {loading ? 'Processing Synapses...' : 'Decode Intent'}
        </button>

        {output && (
          <div className="mt-4 p-4 bg-black/40 border border-primary/20 rounded-lg animate-fade-in">
            <div className="text-[10px] text-primary uppercase font-bold mb-2 tracking-tighter">Robot Command Output</div>
            <p className="text-sm text-gray-300 font-mono leading-relaxed italic">
              "{output}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoderConsole;
