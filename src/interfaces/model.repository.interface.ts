export interface IModelRepository {
  sendMessage(textContent: string): Promise<string | undefined>;
}
