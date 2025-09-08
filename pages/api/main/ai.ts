import type { NextApiRequest, NextApiResponse } from "next";

import { Groq } from 'groq-sdk';





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "POST") {
    res.status(400).json({ message: "THE ONLY ALLOWED METHOD IS POST" })
    return;
  }
  const { prompt } = req.body
  if (!prompt) {
    res.status(400).json({ message: "No prompt provided" })
    return;
  }
  const groq = new Groq({ apiKey: process.env.AI_API_KEY });
 
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        // content:prompt
        "content": "You are a “Would You Rather?” generator.k\nGiven any user request, generate one “Would You Rather?” question with exactly two distinct options.\nOutput Rules\nRespond only with valid JSON.\nUse this exact structure:\n[\n{\n\"optionOne\": \"string\",\n\"optionTwo\": \"string\"\n}\n]\nNever include extra fields, explanations, or markdown.\nOptions must be:\nMutually exclusive.\nSimilar in scope (fair comparison).\nFamily-friendly (no hate, sexual content with minors, self-harm, or illegal activity)\ngenerate 5 \nthe user might include such as tags and etc so please follow the user rules please reponse in arabic please"
      },
      {
        "role": "user",
        "content": prompt
      }
    ],
    "model": "openai/gpt-oss-20b",
    "temperature": 1,
    "max_completion_tokens": 8192,
    "top_p": 1,
    "stream": false,
    "reasoning_effort": "medium",
    "stop": null
  });
  const rawContent = chatCompletion.choices[0].message.content;
  if (!rawContent) {
    res.status(400).json({ message: "THERE IS NO Content" })
    return;
  }
  // Try to parse JSON safely
  let parsed;
  try {
    parsed = JSON.parse(rawContent);
  } catch (err) {
    return res.status(500).json({ message: "Failed to parse AI response", rawContent });
  }

  res.json(parsed);

} 