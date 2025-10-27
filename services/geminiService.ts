import { GoogleGenAI, Type } from "@google/genai";
import { GenerationType } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generationConfig = {
    [GenerationType.CodeGenerator]: {
        prompt: (topic: string, language: string = 'Python') => `Generate a code snippet in ${language} for the following task. Wrap the code in a single markdown code block with the appropriate language identifier.\n\n---\nTASK:\n${topic}\n---`,
        schema: null,
    },
    [GenerationType.CodeExplainer]: {
        prompt: (topic: string) => `Explain the following code block. Break it down conceptually and, if useful, line-by-line. Use markdown for formatting, including bullet points for key concepts and code snippets for examples.\n\n---\nCODE:\n${topic}\n---`,
        schema: null,
    },
};

export const generateCodeContent = async (
    topic: string,
    type: GenerationType,
    language: string
): Promise<string> => {
    const config = generationConfig[type];

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: config.prompt(topic, language),
            config: config.schema ? {
                responseMimeType: "application/json",
                responseSchema: config.schema,
            } : {},
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from the AI. The model may be unavailable or the request may have been blocked.");
    }
};