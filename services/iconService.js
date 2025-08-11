import { GoogleGenerativeAI } from "@google/generative-ai";
export async function fetchAIKeywords(description, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log("[Service] Fetch AI Keywords:", description);

  try {
    const prompt = `
      You are an assistant that converts icon descriptions into short keyword tags.
      The keywords will be used to search icon libraries like Iconify.
      Rules:
      - Output only a comma-separated list of 3–6 keywords.
      - Use lowercase.
      - No explanations or extra text.

      Description: ${description}
    `;
    const result = await model.generateContent(prompt);

    // This is the actual text output from Gemini
    const text = result.response.text().trim();
    console.log("[Service] Gemini Output:", text);

    // Convert the comma-separated list to an array of keywords
    return text
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k);
  } catch (error) {
    console.error("[Service] fetchAIKeywords error:", error);
    throw error;
  }
}

export async function searchIconify(library, keywords, maxIcons = 10) {
  const query = keywords.join(" ");
  console.log(`[Service] Search Iconify: Library=${library}, Query="${query}"`);

  try {
    const res = await fetch(
      `https://api.iconify.design/search?prefix=${library}&query=${encodeURIComponent(
        query
      )}`
    );
    console.log("[Service] Iconify API Response Status:", res.status);
    if (!res.ok) throw new Error(`Iconify API Error: ${res.status}`);

    const data = await res.json();
    console.log("[Service] Iconify API Response:", data);

    return (data.icons || []).slice(0, maxIcons);
  } catch (error) {
    console.error("[Service] searchIconify error:", error);
    throw error;
  }
}
