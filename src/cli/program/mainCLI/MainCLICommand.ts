import { z } from "zod";

import { IMainCLICommandOptions } from "./type";
import { DocumentOrchestratorBuilder } from "../../../orchestration/DocumentOrchestratorBuilder";
import { DocumentTreeBuilder } from "../../../services/builder/DocumentTreeBuilder";
import { renderStrategyFactory } from "../../../services/renderer/RenderStrategyFactory";
import { logger } from "../../../utils/logger/Logger";
import { BaseCommand } from "../../commands/Command";

export class MainCLICommand<
  T extends IMainCLICommandOptions
> extends BaseCommand<T> {
  protected override async beforeExecution(
    args: string[],
    options: T
  ): Promise<void> {
    this.config.set("pattern", args[0]);
    if (!this.updateOptions(options)) {
      throw new Error("Invalid configuration value");
    }
    this.logVerbose();
    await super.beforeExecution(args, options);
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

  private updateOptions(options: IMainCLICommandOptions): boolean {
    try {
      this.config.set("dir", options["dir"]);
      this.config.set("codeConfigFile", options["config"]);
      this.config.set("logLevel", options["verbose"] ? "DEBUG" : "INFO");
      this.config.set("verbose", options["verbose"]);
      this.config.set("outputFormat", options["format"]);
      this.config.set("outputFile", options["output"]);
      this.config.set("ignoreHiddenFiles", options["ignoreHidden"]);
      this.config.set("additionalIgnoreFiles", options["additionalIgnore"]);
    } catch (error) {
      this.handleCLIError(error);
    }
    return true;
  }

  private handleCLIError(error: unknown): void {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map(err => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Configuration validation failed: ${details}`);
    }
    throw error;
  }
}
