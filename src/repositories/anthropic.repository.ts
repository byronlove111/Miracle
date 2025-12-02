import { IModelRepository } from "../interfaces/model.repository.interface";
import Anthropic from "@anthropic-ai/sdk";

export class AnthropicRepository implements IModelRepository {
  constructor() {}

  async sendMessage(textContent: string): Promise<string | undefined> {
    const anthropic = new Anthropic();
    anthropic.apiKey = process.env.ANTHROPIC_API_KEY || null;
    const res = await anthropic.messages.create({
      max_tokens: 1000,
      messages: [{ content: textContent, role: "user" }],
      model: "claude-haiku-4-5-20251001",
    });
    if (res.content[0].type === "text") return res.content[0].text;
  }
}
