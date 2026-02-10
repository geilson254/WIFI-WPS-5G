
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { WiFiNetwork, SecurityReport } from "../types";

export interface SearchResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  createAssistantChat(languageLabel: string = "Português Brasil"): Chat {
    const systemInstruction = `Você é a Aurora, a Assistente Virtual do aplicativo "WiFi WPS 5G", criado por Geilson.
    Sua missão é auxiliar usuários a entender as funcionalidades do app e como instalá-lo.
    O app é multiplataforma e pode ser baixado em:
    - Windows (.exe)
    - macOS (.dmg)
    - Android (.apk e QR Code)
    - iOS (TestFlight e QR Code)

    O app possui as seguintes abas:
    1. Scanner: Localiza redes próximas.
    2. Auditoria IA: Analisa vulnerabilidades técnicas.
    3. Busca Global: Usa Google Search para encontrar informações na web.
    4. Zero-Key: Simula conexões automáticas (fim educativo).
    5. Extrator: Ensina comandos para ver senhas salvas localmente.
    6. Gerador: Cria senhas fortes.
    7. Mapa Local: Mostra redes abertas próximas.
    8. Downloads: O hub oficial para baixar o app em qualquer aparelho.

    Se o usuário perguntar como baixar, direcione-o para a aba "Downloads" e explique que ele pode usar o QR Code para celulares ou baixar o instalador para PC/Mac.
    Responda sempre no idioma: ${languageLabel}. 
    Seja amigável, técnica e concisa. Sempre mencione que o app foi criado por Geilson se perguntarem sobre a autoria.`;

    return this.ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
  }

  async auditNetwork(network: WiFiNetwork, languageLabel: string = "Português Brasil"): Promise<SecurityReport> {
    const prompt = `Analise a seguinte rede WiFi para auditoria de segurança (fim educacional). 
    TODAS AS RESPOSTAS DEVEM SER ESCRITAS NO IDIOMA: ${languageLabel}.
    
    SSID: ${network.ssid}
    BSSID: ${network.bssid}
    Segurança: ${network.security}
    Fabricante: ${network.vendor}
    Canal: ${network.channel}
    Frequência: ${network.frequency}

    Com base no fabricante e no padrão de nome do SSID, identifique vulnerabilidades conhecidas (como WPS pin padrão, senhas de fábrica previsíveis) e forneça um relatório técnico detalhado.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Pontuação de segurança de 0 a 100" },
            vulnerabilities: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de falhas técnicas"
            },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Como proteger esta rede"
            },
            estimatedCrackingTime: { type: Type.STRING, description: "Tempo estimado para quebra via brute force" },
            likelyDefaultPasswords: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Exemplos de senhas comuns/padrão para este modelo/vendor"
            }
          },
          required: ["score", "vulnerabilities", "recommendations", "estimatedCrackingTime", "likelyDefaultPasswords"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error("Erro ao analisar resposta da IA", e);
      throw new Error("Falha na auditoria");
    }
  }

  async searchGlobal(query: string, languageLabel: string = "Português Brasil"): Promise<SearchResult> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Responda no idioma ${languageLabel}: ${query}`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      ?.map(chunk => ({
        title: chunk.web?.title || 'Fonte',
        uri: chunk.web?.uri || '#'
      })) || [];

    return {
      text: response.text || '',
      sources: sources
    };
  }
}

export const geminiService = new GeminiService();
