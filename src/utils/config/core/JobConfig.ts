import { z } from "zod";

import { ConfigManager } from "./ConfigManager";
import { logger } from "../../logger";
import { IJobConfig, jobConfigSchema } from "../schema";

export class JobConfig extends ConfigManager<IJobConfig> {
  public constructor(config: IJobConfig) {
    super(config);
  }

  protected validate(config: IJobConfig): IJobConfig {
    return jobConfigSchema.parse(config);
  }

  protected handleConfigError(error: unknown): void {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map(err => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      logger.error(`Configuration validation failed: ${details}`);
      throw new Error("Configuration validation failed");
    }
    throw error;
  }
}
