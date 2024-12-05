import { DocumentOrchestrator } from "./DocumentOrchestrator";
import { NodeDirectory } from "../core/entities/NodeDirectory";
import { NodeFile } from "../core/entities/NodeFile";
import { IRenderStrategy } from "../services/renderer/RenderStrategy";
import { Config } from "../utils/config/Config";
import { logger } from "../utils/logger/Logger";

export class DocumentOrchestratorBuilder {
  private root: NodeDirectory | NodeFile | null = null;
  private config: Config | null = null;
  private strategies: IRenderStrategy[] = [];

  public setRoot(root: NodeDirectory | NodeFile): this {
    this.root = root;
    return this;
  }

  public setConfig(config: Config): this {
    this.config = config;
    return this;
  }

  public addStrategy(strategy: IRenderStrategy): this {
    this.strategies.push(strategy);
    return this;
  }

  public setStrategies(strategies: IRenderStrategy[]): this {
    this.strategies = strategies;
    return this;
  }

  public async build(): Promise<DocumentOrchestrator[]> {
    if (!this.root || !this.config) {
      throw new Error("Missing required components for DocumentOrchestrator");
    }

    if (this.strategies.length === 0) {
      throw new Error("At least one render strategy is required");
    }

    const orchestrators: DocumentOrchestrator[] = [];

    for (const strategy of this.strategies) {
      const orchestrator = await DocumentOrchestrator.create(
        this.root,
        this.config
      );
      orchestrator.setStrategy(strategy);
      orchestrators.push(orchestrator);
    }

    return orchestrators;
  }
  public async buildAndExecute(): Promise<DocumentOrchestrator[]> {
    const orchestrators = await this.build();

    for (const orchestrator of orchestrators) {
      try {
        await orchestrator.build();
      } catch (error) {
        logger.error(
          `Failed to build documentation with strategy ${orchestrator.getStrategyName()}`,
          error as Error
        );
      }
    }

    return orchestrators;
  }
}
