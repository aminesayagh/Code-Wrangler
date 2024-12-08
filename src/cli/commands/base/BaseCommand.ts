import { Config } from "../../../utils/config";
import { logger } from "../../../utils/logger";

export abstract class BaseCommand {
  public constructor(protected readonly config: Config) {}

  public async create(): Promise<void> {
    try {
      await this.beforeExecution();
      await this.processExecution();
      await this.afterExecution();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected abstract processExecution(): Promise<void>;

  protected async beforeExecution(): Promise<void> {
    if (this.config.get("verbose")) {
      await Promise.resolve(this.logVerbose());
    }
  }

  protected abstract afterExecution(): Promise<void>;

  protected abstract logVerbose(): void;

  protected handleError(error: unknown): void {
    logger.error("Command execution failed", error as Error);
  }
}
