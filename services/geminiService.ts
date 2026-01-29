
import { GoogleGenAI, Type } from "@google/genai";
import { Answer, Question, EvaluationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function evaluateTest(questions: Question[], answers: Answer[]): Promise<EvaluationResult> {
  const model = 'gemini-3-flash-preview';
  
  const formattedData = answers.map(ans => {
    const q = questions.find(item => item.id === ans.questionId);
    return {
      pregunta: q?.text,
      tipo: q?.type,
      nivel_objetivo: q?.level,
      respuesta_usuario: ans.answer,
      respuesta_correcta: q?.correctAnswer
    };
  });

  const prompt = `
    Eres un evaluador experto de inglés del Instituto Latinoamericano de Aviación Civil (ILAC).
    Tu tarea es analizar los resultados de un test de nivel de 20 preguntas basado en el MCER (A1-C2).
    
    Datos del test: ${JSON.stringify(formattedData)}
    
    Instrucciones:
    1. Calcula el puntaje total sobre 100.
    2. Determina el nivel CEFR predominante (A1, A2, B1, B2, C1, C2).
    3. Genera un feedback motivador y profesional en español, mencionando fortalezas observadas.
    
    Responde ÚNICAMENTE con un objeto JSON válido.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING },
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING }
          },
          required: ["level", "score", "feedback"]
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error evaluating:", error);
    return { level: "B1", score: 50, feedback: "Tu nivel es intermedio. Sigue practicando." };
  }
}

export async function sendFinalData(userData: any, result: EvaluationResult) {
  // Simulación de envío de correo a dmontoto@ilac.com.ar
  console.log("Enviando reporte a dmontoto@ilac.com.ar...");
  console.log("CANDIDATO:", userData);
  console.log("RESULTADOS:", result);
  await new Promise(r => setTimeout(r, 1500));
  return true;
}
