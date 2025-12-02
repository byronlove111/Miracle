import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";
import readline from "readline/promises";
import { ModelEntity, PROVIDERS } from "./entities/model.entity";
import { SendMessageService } from "./services/sendMessage.service";

async function main() {
  const anthropic = new Anthropic();
  anthropic.apiKey = process.env.ANTHROPIC_API_KEY || null;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  while (true) {
    let lastMessage: string;

    lastMessage = await rl.question("");
    if (lastMessage === "exit") break;
    const model = new ModelEntity(PROVIDERS.anthropic);
    const sendMessageService = new SendMessageService(model);
    const response = await sendMessageService.execute(lastMessage);
    console.log(response);
  }
  rl.close();
}

main().catch((error) => {
  console.log(error);
});
