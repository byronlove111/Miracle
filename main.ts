import Anthropic from "@anthropic-ai/sdk";
import { delete_file, edit_file, list_files, read_file } from "./tools";

const prompt = (query: string) => {
  return new Promise<string>((resolve) => {
    process.stdout.write(query);
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ToolDefinition = {
  name: string;
  description: string;
  input_schema: any;
  execute: any;
};

async function executeTool(
  name: string,
  input: any,
  allTools: ToolDefinition[]
): Promise<string> {
  const tool = allTools.find((f) => f.name === name);
  const result = await tool?.execute(input);
  return `${result}`;
}

async function main() {
  const anthropic = new Anthropic({
    apiKey: Bun.env.ANTHROPIC_API_KEY,
  });
  const allTools: ToolDefinition[] = [
    read_file,
    list_files,
    edit_file,
    delete_file,
  ];
  const messages: Message[] = [];

  console.log("Chat with AI. Type 'exit' or CTRL + C to end the conversation.");
  while (true) {
    const lastMessage = await prompt("\u001b[94mYou\u001b[0m: ");

    if (lastMessage === "debug") {
      console.log(messages);
      console.log(allTools);
      continue;
    }
    if (lastMessage === "exit") break;
    messages.push({
      role: "user",
      content: lastMessage,
    });

    let hasToolUse = true;
    while (hasToolUse) {
      const message = await anthropic.messages.create({
        max_tokens: 8192,
        system: `You are an AI assistant specialized in file management and manipulation.

Your main objective is to help the user accomplish code and file management tasks efficiently and securely.

IMPORTANT RULE: When the user asks to MODIFY or DELETE a file, you MUST ALWAYS:
1. Start by listing files to verify the exact paths and confirm you're selecting the correct file
2. Visually confirm with the user that you have the right file before performing the operation
3. Only after validating the correct path, perform the modification or deletion

This prevents accidental errors and ensures that the right operations are performed on the right files.

LANGUAGE RULE: Always respond in the same language as the user's message. If the language is unclear or ambiguous, default to English.

Always be clear, precise and transparent in your actions.`,
        messages: messages,
        model: "claude-haiku-4-5-20251001",
        tools: allTools,
      });

      if (!message) {
        throw new Error("API call failed");
      }

      hasToolUse = false;

      for (let i = 0; i < message.content.length; i++) {
        const block = message.content[i];
        if (block.type === "text") {
          messages.push({
            role: "assistant",
            content: block.text,
          });
          console.log("\u001b[93mClaude\u001b[0m:", block.text);
          continue;
        }
        if (block.type === "tool_use") {
          hasToolUse = true;
          messages.push({
            role: "assistant",
            content: JSON.stringify(block),
          });
          const toolResult = await executeTool(
            block.name,
            block.input,
            allTools
          );
          console.log("\u001b[92mTool\u001b[0m:", block.name, "...");
          messages.push({
            role: "user",
            content: toolResult,
          });
          continue;
        }
      }
    }
  }
}

main().catch((error) => {
  console.log(error);
});
