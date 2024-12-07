import { IDocumentOrchestrator } from "./interfaces/IDocumentOrchestrator";
import { NodeDirectory } from "../core/entities/NodeDirectory";
import { NodeFile } from "../core/entities/NodeFile";
import { documentFactory } from "../infrastructure/filesystem/DocumentFactory";
import { IRenderStrategy } from "../services/renderer/RenderStrategy";
import { Config } from "../utils/config/Config";
import { OUTPUT_FORMATS, OutputFormat } from "../utils/config/schema";
import { logger } from "../utils/logger/Logger";

export class DocumentOrchestrator implements IDocumentOrchestrator {
  private strategy: IRenderStrategy | null = null;

  private constructor(
    private readonly root: NodeDirectory | NodeFile,
    private readonly config: Config
  ) {}

  public static create(
    root: NodeDirectory | NodeFile,
    config: Config
  ): DocumentOrchestrator {
    const orchestrator = new DocumentOrchestrator(root, config);
    orchestrator.initialize();
    return orchestrator;
  }

  public setStrategy(strategy: IRenderStrategy): this {
    this.strategy = strategy;
    return this;
  }

  public async build(): Promise<void> {
    try {
      if (!this.strategy) {
        throw new Error("Strategy is not set");
      }

      const content = this.strategy.render(this.root as NodeDirectory);
      const outputPath = this.resolveOutputPath(this.strategy.getName());
      await this.ensureOutputDirectory(outputPath);
      await this.writeOutput(outputPath, content);

      logger.success(`Document built successfully at ${outputPath}`);
    } catch (error) {
      logger.error("Failed to build document", error as Error);
      throw error;
    }
  }

  public getStrategyName(): string {
    return this.strategy?.getName() ?? "Unknown";
  }

  public dispose(): void {
    this.strategy?.dispose();
  }

  private initialize(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (!(this.root.type == "directory") && !(this.root.type == "file")) {
      throw new Error("Invalid root node type");
    }
  }

  private resolveOutputPath(outputFormat: OutputFormat): string {
    const outputFile = this.config.get("outputFile");
    return documentFactory.resolve(
      `${outputFile}.${OUTPUT_FORMATS[outputFormat]}`
    );
  }

  private async ensureOutputDirectory(outputPath: string): Promise<void> {
    const directory = documentFactory.baseName(outputPath);
    if (
      outputPath.endsWith(`.${OUTPUT_FORMATS.html}`) ||
      outputPath.endsWith(`.${OUTPUT_FORMATS.markdown}`)
    ) {
      return;
    }
    await documentFactory.ensureDirectory(directory);
  }

  private async writeOutput(
    outputPath: string,
    content: string
  ): Promise<void> {
    await documentFactory.writeFile(outputPath, content);
  }
}
