import { Command, CommandOptions } from "./types";
import { Config } from "../../utils/config/Config";
import { logger } from "../../utils/logger/Logger";
import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";

export class GenerateCommand implements Command {
  constructor(private config: Config) {}

  private logVerbose(): void {
    logger.debug(
      `Searching for file matching pattern: ${this.config.get("pattern")}`
    );
    logger.debug(
      `Excluding patterns: ${(
        this.config.get("excludePatterns") as string[]
      ).join(", ")}`
    );
    logger.debug(
      `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
    );
    logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
  }

  async execute(args: string[], options: CommandOptions): Promise<void> {
    try {
      // Override config with command options
      this.config.override({ ...options, pattern: args[0] });

      // Log verbose information if enabled
      if (options.verbose) {
        this.logVerbose();
      }

      // Execute document tree building
      const builder = new DocumentTreeBuilder(
        this.config,
        new RenderStrategy(this.config)
      );
      await builder.build();
    } catch (error) {
      logger.error("Generation failed:", error);
      throw error;
    }
  }
}
