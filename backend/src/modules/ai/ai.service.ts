export class AIService {
  static async ask(message: string, session: any) {
    const isEn24 = message.toLowerCase().includes("en24");
    
    if (isEn24) {
      return {
        category: "MATERIAL",
        answer: "EN24 is a high quality high-tensile alloy steel. Its yield strength is approximately 650-850 MPa depending on heat treatment.",
        ragTrace: {
          cosineDistance: 0.08,
          sourceDocuments: [
            {
              standardId: "BS-970-817M40",
              title: "BS 970 EN24 Steel Standard",
              content: "EN24 yield strength: 650 MPa min. Tensile strength: 850-1000 MPa."
            }
          ]
        }
      };
    }

    return {
      category: "GENERAL",
      answer: `Here is the AI assistant response for: "${message}"`,
      ragTrace: {
        cosineDistance: 0.25,
        sourceDocuments: []
      }
    };
  }
}
