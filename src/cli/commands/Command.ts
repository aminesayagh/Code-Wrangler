/* eslint-disable require-await */
import { ICommandOptions } from "./types";
import { Config } from "../../utils/config/Config";
import { ProgressBar } from "../../utils/helpers/ProgressBar";
import { logger } from "../../utils/logger/Logger";

export abstract class BaseCommand<T extends ICommandOptions> {
  public constructor(protected config: Config) {}

  public async execute(args: string[], options: T): Promise<void> {
    try {
      // Pre-execution phase
      await this.beforeExecution(args, options);

      // Progress tracking
      const progressBar = new ProgressBar(100);
      await progressBar.execute(async () => {
        await this.processExecution();
      });

      // Post-execution phase
      await this.afterExecution();
    } catch (error) {
      await this.handleError(error);
      throw error;
    }
  }

  // Template methods that can be overridden
  protected async beforeExecution(_: string[], options: T): Promise<void> {
    if (options.verbose) {
      this.logVerbose();
    }
  }

  protected abstract processExecution(): Promise<void>;

  protected async afterExecution(): Promise<void> {
    // Default implementation - override if needed
  }

  protected async handleError(error: unknown): Promise<void> {
    logger.error("Command execution failed:", error as Error);
  }

  protected logVerbose(): void {
    // Default verbose logging - override to add command-specific logs
    logger.debug("Executing command with verbose logging");
  }
}
