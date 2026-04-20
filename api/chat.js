export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: message
      })
    });

    const data = await response.json();

    // 🔥 新しいレスポンス形式
    const reply = data.output?.[0]?.content?.[0]?.text || "返答なし";

    return res.status(200).json({
      choices: [
        { message: { content: reply } }
      ]
    });

  } catch (e) {
    return res.status(500).json({
      error: "server error",
      detail: e.toString()
    });
  }
}
