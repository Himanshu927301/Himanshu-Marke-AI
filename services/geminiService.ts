import { GoogleGenAI } from "@google/genai";
import { StockAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeStock = async (companyName: string): Promise<StockAnalysis> => {
  const modelId = "gemini-2.5-flash"; // Using Flash for speed with search

  const prompt = `
    You are an expert AI stock market analyst for "Himanshu Market You". 
    Analyze the company: "${companyName}".
    
    Use Google Search to find the latest REAL-TIME stock price, today's percentage change, breaking news, and market sentiment.
    
    Based on technical indicators and news, determine if a trader should BUY (Call) or SELL (Put) right now.
    
    CRITICAL: You must return the response as a valid JSON object string. Do not wrap it in markdown code blocks like \`\`\`json. Just the raw JSON string.
    
    The JSON structure must be:
    {
      "symbol": "Ticker Symbol (e.g. HDFC, AMZN)",
      "name": "Full Company Name",
      "currentPrice": "Current price with currency symbol",
      "currency": "Currency code (USD, INR, etc.)",
      "changePercent": "Percentage change today (e.g. +1.2% or -0.5%)",
      "signal": "CALL" or "PUT",
      "confidence": "A percentage between 90% and 99% based on indicator strength",
      "trendDirection": "UP" or "DOWN",
      "predictedTarget": "A short term price target prediction",
      "reasoning": "A concise paragraph explaining why to Call or Put based on news and data.",
      "news": [
        { "title": "Headline 1", "source": "Source Name" },
        { "title": "Headline 2", "source": "Source Name" },
        { "title": "Headline 3", "source": "Source Name" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // We cannot use responseSchema with googleSearch, so we prompt for JSON text carefully
        temperature: 0.3, 
      },
    });

    let text = response.text || "{}";
    
    // Clean up potential markdown formatting if the model disobeys
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    
    if (start !== -1 && end !== -1) {
        text = text.substring(start, end + 1);
    }

    const data = JSON.parse(text) as StockAnalysis;
    
    // Add URLs from grounding if available (optional enhancement, sticking to basic structure for now)
    // The model typically embeds source info in text, but we parsed strictly.
    // We will trust the parsed news items.

    return data;
  } catch (error) {
    console.error("Analysis failed:", error);
    // Fallback data in case of API failure or parsing error
    return {
      symbol: "ERR",
      name: companyName,
      currentPrice: "---",
      currency: "",
      changePercent: "0.00%",
      signal: "HOLD",
      confidence: "0%",
      trendDirection: "FLAT",
      reasoning: "Could not retrieve real-time data. Please try again.",
      news: [],
    };
  }
};