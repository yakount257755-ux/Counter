import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const solveMathProblem = async (problem: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key မတွေ့ရှိပါ။ (API Key missing)");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: problem,
      config: {
        systemInstruction: `You are a helpful and intelligent math assistant for Burmese users. 
        Your goal is to solve math problems, word problems, or explain concepts in the Burmese language.
        
        Rules:
        1. Always answer in Burmese (မြန်မာဘာသာ).
        2. Show the step-by-step solution if it's a complex problem.
        3. If the user just provides an expression (e.g., "50 * 25"), just give the result concisely, but politely.
        4. If it is a word problem, explain the logic.
        5. Use standard Burmese mathematical terms.
        6. Format the final answer clearly (e.g., "အဖြေ: ...").
        `,
      },
    });

    return response.text || "အဖြေရှာမရနိုင်ပါ။ (Could not find solution)";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ဆာဗာချိတ်ဆက်မှု ပြဿနာရှိနေပါသည်။ ပြန်လည်ကြိုးစားကြည့်ပါ။ (Connection Error)";
  }
};