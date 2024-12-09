import { z } from "zod";

import { Config } from "./Config";
import { ConfigManager } from "./ConfigManager";
import { logger } from "../../logger";
import {
  DEFAULT_JOB_CONFIG,
  IJobConfig,
  JobConfigOptions,
  jobConfigSchema
} from "../schema";

export class JobConfig extends ConfigManager<IJobConfig> {
  public constructor(
    jobConfig: JobConfigOptions,
    public global: Config
  ) {
    super({ ...DEFAULT_JOB_CONFIG, ...jobConfig });
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
