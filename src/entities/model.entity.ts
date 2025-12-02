export enum PROVIDERS {
  anthropic = "anthropic",
  mistral = "mistral",
  openai = "openai",
}

export class ModelEntity {
  providerName: PROVIDERS;

  constructor(providerName: PROVIDERS) {
    if (!Object.values(PROVIDERS).includes(providerName)) {
      throw new Error("Provider invalide");
    }
    this.providerName = providerName;
  }

  setProviderName(providerName: PROVIDERS) {
    this.providerName = providerName;
  }

  getProviderName() {
    return this.providerName;
  }
}
