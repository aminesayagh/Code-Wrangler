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
    const mergedConfig = JobConfig.merge(jobConfig);
    super(mergedConfig);
  }

  public static override merge<T = IJobConfig>(
    config: Partial<T>,
    defaultConfig: Omit<T, "name"> = DEFAULT_JOB_CONFIG as Omit<T, "name">
  ): T {
    return super.merge(config, defaultConfig) as T;
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
