import  {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
}from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log(apiKey); 

if (!apiKey) {
  throw new Error("API key not found. Please ensure the environment variable is set.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b-exp-0827",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
export const chatSession = model.startChat({
  generationConfig,
 
});
