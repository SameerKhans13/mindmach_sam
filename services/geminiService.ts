
import { GoogleGenAI } from "@google/genai";

// Decoding neural intent is a complex reasoning task, using gemini-3-pro-preview.
export const decodeNeuralSignal = async (prompt: string) => {
  try {
    // Initializing with process.env.API_KEY directly as required.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are the Neural Decoder AI for a high-end neuroscience interface. 
      The user is sending raw EMG/Neural intent data. 
      Interpret this intent and explain how it translates to a robotic command.
      Intent: ${prompt}
      Keep it brief, technical, and futuristic.`,
      config: {
        temperature: 0.7,
      }
    });

    // Accessing .text property directly.
    return response.text || "Unable to parse neural intent.";
  } catch (error) {
    console.error("Gemini Decoding Error:", error);
    return "Error in neural link processing.";
  }
};
