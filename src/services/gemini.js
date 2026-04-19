import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Store an ongoing chat session so the app natively remembers history
let chatSession = null;

export async function getChatResponseStream(message, onChunk) {
  if (!ai) {
    onChunk("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
    return false; // return false for error
  }
  
  try {
    if (!chatSession) {
      chatSession = await ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "You are an expert study abroad mentor helping Indian students with universities, visas, SOP, and education loans. Answer concisely but helpfully in a friendly tone.",
          temperature: 0.7,
        }
      });
    }

    const responseStream = await chatSession.sendMessageStream({ message });
    
    let fullResponse = "";
    for await (const chunk of responseStream) {
       fullResponse += chunk.text;
       onChunk(fullResponse);
    }
    
    return true; // streaming finished successfully
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("Sorry, I am having trouble connecting right now.");
    return false;
  }
}

export async function getCareerRecommendation(data) {
    if (!ai) return null;
    
    const prompt = `
      As an expert study abroad counsellor for Indian students, provide a suitable recommendation based on the following profile:
      - Field of Interest: ${data.field}
      - GPA/Percentage: ${data.gpa}
      - Budget (Total in INR): ${data.budget}
      - Preferred Region: ${data.country}
  
      Provide exactly 3 concise country recommendations and 3 matching course/program names out of those countries. Then, write a very short personalized explanation (2-3 sentences) on why this works.
      Format the output as JSON matching exactly this structure:
      {
        "countries": ["Country 1", "Country 2", "Country 3"],
        "courses": ["Course 1", "Course 2", "Course 3"],
        "explanation": "Your explanation here"
      }
      Do not include markdown wrappers like \`\`\`json around the response, return only raw valid JSON.
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
        }
      });
  
      const text = response.text.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
}
