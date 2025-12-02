import { ModelEntity, PROVIDERS } from "../entities/model.entity";
import { AnthropicRepository } from "../repositories/anthropic.repository";

export class SendMessageService {
  private modelEntity: ModelEntity;
  constructor(modelEntity: ModelEntity) {
    this.modelEntity = modelEntity;
  }

  async execute(textContent: string) {
    const provider = this.modelEntity.getProviderName();
    switch (provider) {
      case PROVIDERS.anthropic:
        const repo = new AnthropicRepository();
        const res = repo.sendMessage(textContent);
        return res;

      default:
        throw new Error("Provider not supported");
    }
  }
}
