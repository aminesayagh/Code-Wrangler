import { IRenderStrategy } from "../../services/renderer/RenderStrategy";

export interface IDocumentOrchestrator {
  setStrategy: (strategy: IRenderStrategy) => this;
  getStrategyName: () => string;
  build: () => Promise<void>;
  dispose: () => void;
}
