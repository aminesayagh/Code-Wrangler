import { ICommand } from "./type";
import { Config } from "../../../utils/config";
import { logger } from "../../../utils/logger";

// T: Has to be the valid and parsed options provided by the CLI
export abstract class BaseCommand implements ICommand {
  public constructor(protected readonly config: Config) {}

  public async execute(): Promise<void> {
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
  protected abstract logVerbose(): void;

  protected async beforeExecution(): Promise<void> {
    if (this.config.get("verbose")) {
      await Promise.resolve(this.logVerbose());
    }
  }
  protected abstract afterExecution(): Promise<void>;

  protected handleError(error: unknown): void {
    logger.error("Command execution failed", error as Error);
  }
}
