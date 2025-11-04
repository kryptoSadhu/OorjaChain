import { GoogleGenAI, Type, Chat } from "@google/genai";
import { CalculatorInput, GeminiResponse } from "../types";

// FIX: Per coding guidelines, initialize the client directly with process.env.API_KEY.
// The availability of the key is a hard requirement handled externally, so no fallbacks,
// warnings, or conditional checks are needed here.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        dailyEarningsBTC: { type: Type.NUMBER },
        dailyEarningsINR: { type: Type.NUMBER },
        monthlyEarningsBTC: { type: Type.NUMBER },
        monthlyEarningsINR: { type: Type.NUMBER },
        yearlyEarningsBTC: { type: Type.NUMBER },
        yearlyEarningsINR: { type: Type.NUMBER },
        analysis: {
          type: Type.STRING,
          description: "A brief, encouraging analysis of the earning potential in 2-3 sentences, mentioning key factors."
        },
        assumptions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-4 key assumptions made for this calculation (e.g., BTC price, mining difficulty, hardware efficiency)."
        }
    },
    required: ["dailyEarningsBTC", "dailyEarningsINR", "monthlyEarningsBTC", "monthlyEarningsINR", "yearlyEarningsBTC", "yearlyEarningsINR", "analysis", "assumptions"]
};

export const calculateEarningPotential = async (input: CalculatorInput): Promise<GeminiResponse> => {
  const prompt = `
    You are an expert financial analyst for "OorjaChain", a company in Mumbai, India, that helps homeowners earn Bitcoin with excess solar power. 
    Your task is to calculate the potential Bitcoin mining earnings based on the user's input and current market conditions.

    Current Market Assumptions (use these for your calculation):
    - Bitcoin Price: 5,500,000 INR
    - Average Mining Hardware Efficiency: 30 W/TH (watts per terahash)
    - A simplified mining reward factor: Assume 0.00000010 BTC per TH/s per day.
    - Currency is Indian Rupees (INR).

    User's Input:
    - Solar Panel Capacity: ${input.panelCapacity} kWp
    - Average Daily Sunlight Hours: ${input.sunlightHours} hours
    - Electricity Cost (for context, though we focus on excess power): ${input.electricityCost} INR/kWh
    - Percentage of excess power allocated to mining: ${input.excessPowerAllocation}%

    Calculation Steps:
    1.  Calculate total daily energy generation: Solar Capacity (kWp) * Sunlight Hours (h) = kWh per day.
    2.  Calculate energy available for mining: Total daily energy * (Excess Power Allocation / 100).
    3.  Calculate the constant power supply for mining (in Watts): (Energy for mining (kWh) / 24 hours) * 1000.
    4.  Calculate the sustainable hashrate (in TH/s): Constant power supply (W) / Hardware Efficiency (W/TH).
    5.  Calculate daily BTC earnings: Hashrate (TH/s) * Reward Factor (BTC per TH/s per day).
    6.  Convert daily BTC to INR.
    7.  Extrapolate to get monthly (30 days) and yearly (365 days) earnings in both BTC and INR.

    Return the result ONLY in the provided JSON format. The analysis should be positive and highlight the benefit of using otherwise unused solar power.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.2
        },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    if (
      typeof parsedResponse.dailyEarningsBTC !== 'number' ||
      !parsedResponse.analysis ||
      !Array.isArray(parsedResponse.assumptions)
    ) {
        throw new Error("Received an invalid response structure from the API.");
    }

    return parsedResponse as GeminiResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to calculate earnings. The AI model may be temporarily unavailable.");
  }
};

export const createChatSession = (): Chat => {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are Oorja, a helpful and friendly AI assistant for OorjaChain users. You specialize in topics related to solar power, bitcoin mining, and the Indian energy market. Keep your answers informative but easy to understand.',
        },
    });
    return chat;
};
