import OpenAI from "openai";
export async function fetchAIKeywords(description, apiKey) {
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  console.log("[Service] Fetch AI Keywords:", description);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You turn icon descriptions into short icon keywords.",
        },
        { role: "user", content: description },
      ],
    });
    const data = await completion.json();
    console.log("[Service] AI API Response:", completion);

    return data.choices[0].message.content.split(",").map((k) => k.trim());
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
