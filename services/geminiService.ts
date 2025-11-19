import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSupportResponse = async (userMessage: string, contextData: string): Promise<string> => {
  try {
    const systemInstruction = `
      You are "NexusBot", an expert DevOps support agent for a container-based hosting platform called "NexusHost".
      
      Technical Context:
      - Host OS: Ubuntu Server 24.04 LTS
      - Core Tech: Docker Containers for isolation.
      - Ingress: Cloudflare Tunnel (cloudflared) for exposing services securely without port forwarding.
      
      The user is currently viewing: ${contextData}

      Guidelines:
      1. Explain issues in terms of Containers and Tunnels. 
      2. If a user asks about FTP, explain that we use SFTP or mapped Volumes because it's Docker-based.
      3. If a site is down, suggest checking the 'Docker Logs' or 'Tunnel Status'.
      4. Be helpful, concise, and technically accurate but easy to understand.
      5. Emphasize the security benefits of Cloudflare Tunnel if asked about IPs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try asking again in a moment.";
  }
};