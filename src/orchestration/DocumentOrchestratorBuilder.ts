import { DocumentOrchestrator } from "./DocumentOrchestrator";
import { NodeDirectory } from "../core/entities/NodeDirectory";
import { NodeFile } from "../core/entities/NodeFile";
import { renderStrategyFactory } from "../services/renderer/RenderStrategyFactory";
import { Config, JobConfig } from "../utils/config";
import { logger } from "../utils/logger/Logger";

export class DocumentOrchestratorBuilder {
  private root: NodeDirectory | NodeFile | null = null;
  private config: Config | null = null;
  private jobs: JobConfig[] = [];

  public setRoot(root: NodeDirectory | NodeFile): this {
    this.root = root;
    return this;
  }

  public setConfig(config: Config): this {
    this.config = config;
    return this;
  }

  public setJobs(jobs: JobConfig[]): this {
    this.jobs = jobs;
    return this;
  }

  public async build(): Promise<DocumentOrchestrator[]> {
    this.validate();
    const orchestrators: DocumentOrchestrator[] = [];

    for (const job of this.jobs) {
      const outputFormat = job.get("outputFormat");
      const strategies = await renderStrategyFactory.createStrategies(
        job,
        outputFormat
      );
      for (const strategy of strategies) {
        const orchestrator = DocumentOrchestrator.create(
          this.root as NodeDirectory | NodeFile,
          job as JobConfig
        );
        orchestrator.setStrategy(strategy);
        orchestrators.push(orchestrator);
      }
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

  private validate(): void {
    if (!this.root || !this.config) {
      throw new Error("Missing required components for DocumentOrchestrator");
    }

    if (this.jobs.length === 0) {
      throw new Error("At least one job is required");
    }
  }
}
