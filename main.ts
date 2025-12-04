import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";
import readline from "readline/promises";

type Message = {
  role: "user" | "assistant";
  content: string;
};

async function main() {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  const messages: Message[] = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Chat with AI. Type 'exit' or CTRL + C to end the conversation.");
  while (true) {
    let lastMessage: string;

    lastMessage = await rl.question("");
    if (lastMessage === "debug") {
      console.log(messages);
      continue;
    }
    if (lastMessage === "exit") break;
    messages.push({
      role: "user",
      content: lastMessage,
    });

    const message = await anthropic.messages.create({
      max_tokens: 1024,
      messages: messages,
      model: "claude-haiku-4-5-20251001",
    });
    if (!message) {
      rl.close();
      throw new Error("API call failed");
    }

    if (message.content[0].type === "text") {
      messages.push({
        role: "assistant",
        content: message.content[0].text,
      });
      console.log("\n\nAI : ", message.content[0].text, "\n\n");
    }
  }
  rl.close();
}

main().catch((error) => {
  console.log(error);
});
