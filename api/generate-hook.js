export default async function handler(req, res) {
  const { topic } = req.body;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `Write a viral TikTok hook for this topic: ${topic}`,
      temperature: 0.8,
      max_tokens: 50,
    }),
  });

  const data = await response.json();
  const hook = data.choices?.[0]?.text?.trim();

  res.status(200).json({ hook });
}
