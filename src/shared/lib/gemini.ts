import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import configUpload from "@/config/upload";
import fs from "fs";
import path from "path";

function base64ToFile(base64String: string, filePath: string) {
  const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, "");
  fs.writeFileSync(filePath, base64Data, "base64");
}

async function analyzeImage(base64Image: string) {
  // apiKey: Obtém a chave da API do ambiente.
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not defined");

  // tempFilePath: Define o caminho para armazenar temporariamente a imagem JPEG convertida.
  const tempFilePath = path.join(configUpload.uploadsFolder, "temp_image.jpg");

  // base64ToFile: Converte e salva a imagem base64 no caminho temporário.
  base64ToFile(base64Image, tempFilePath);

  // fileManager: Cria uma instância do gerenciador de arquivos da API para fazer upload.
  const fileManager = new GoogleAIFileManager(apiKey);
  // genAI: Cria uma instância do cliente da API para gerar conteúdo.
  const genAI = new GoogleGenerativeAI(apiKey);

  // uploadResult: Faz o upload do arquivo temporário e obtém o resultado do upload.
  const uploadResult = await fileManager.uploadFile(tempFilePath, {
    mimeType: "image/jpeg",
    displayName: "Measurement Image",
  });

  // model: Obtém um modelo generativo específico (no caso, "gemini-1.5-flash").
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log(uploadResult.file.uri);
  console.log(uploadResult.file.mimeType);
  // result: Usa o modelo para gerar uma análise do conteúdo da imagem.
  const result = await model.generateContent([
    "Tell me about this image.",
    {
      fileData: {
        fileUri: uploadResult.file.uri,
        mimeType: uploadResult.file.mimeType,
      },
    },
  ]);

  return {
    image_url_gemini: uploadResult.file.uri,
    measure_value_gemini: parseInt(result.response.text(), 10),
  };
}

export default analyzeImage;
