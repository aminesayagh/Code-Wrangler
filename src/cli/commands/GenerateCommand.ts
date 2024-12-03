import { ICommand, ICommandOptions } from "./types";
import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
import { HTMLRenderStrategy } from "../../services/renderer/strategies/HTMLStrategy";
import { MarkdownStrategy } from "../../services/renderer/strategies/MarkdownStrategy";
import { Config } from "../../utils/config/Config";
import { logger } from "../../utils/logger/Logger";

export class GenerateCommand implements ICommand {
  constructor(private config: Config) {}

  public async execute(
    args: string[],
    options: ICommandOptions
  ): Promise<void> {
    try {
      // Override config with command options
      this.config.override({ ...options, pattern: args[0] });

      // Log verbose information if enabled
      if (options.verbose) {
        this.logVerbose();
      }

      // Execute document tree building
      const outputFormat = this.config.get("outputFormat");
      outputFormat.map(format => {
        switch (format) {
          case "markdown":
            return new MarkdownStrategy(this.config);
          case "html":
            return new HTMLRenderStrategy(this.config);
          default:
            throw new Error(`Unsupported output format: ${format}`);
        }
      });
      const builder = new DocumentTreeBuilder(this.config);
      await builder.build();
    } catch (error) {
      logger.error("Generation failed:", error as Error);
      throw error;
    }
  }

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
}
