import { BaseCommand } from "./Command";
import { ICommandOptions } from "./types";
import { DocumentOrchestratorBuilder } from "../../orchestration/DocumentOrchestratorBuilder";
import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
import { renderStrategyFactory } from "../../services/renderer/RenderStrategyFactory";
import { logger } from "../../utils/logger/Logger";

export class MainCICommand extends BaseCommand {
  protected override async beforeExecution(
    args: string[],
    options: ICommandOptions
  ): Promise<void> {
    await super.beforeExecution(args, options);
    this.config.set("pattern", args[0]);
  }

  protected override async processExecution(): Promise<void> {
    const builder = new DocumentTreeBuilder(this.config);
    const root = await builder.build();

    const orchestrator = new DocumentOrchestratorBuilder()
      .setRoot(root)
      .setConfig(this.config);

    const outputFormat = this.config.get("outputFormat");
    const strategies = await renderStrategyFactory.createStrategies(
      this.config,
      outputFormat
    );

    orchestrator.setStrategies(strategies);

    const orchestrators = await orchestrator.buildAndExecute();

    logger.info(`Generated ${orchestrators.length} documents`);
  }

  protected override logVerbose(): void {
    super.logVerbose();
    logger.debug(
      `Searching for file matching pattern: ${this.config.get("pattern")}`
    );
    logger.debug(
      `Excluding patterns: ${(this.config.get("excludePatterns") as string[]).join(", ")}`
    );
    logger.debug(
      `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
    );
    logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
  }
}
