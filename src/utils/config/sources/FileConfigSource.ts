import { z } from "zod";

import { IConfigurationSource } from "./interfaces/IConfigurationSource";
import { JsonReader } from "../../../infrastructure/filesystem/JsonReader";
import { logger } from "../../logger";
import { Config } from "../core/Config";
import { JobConfig } from "../core/JobConfig";
import { IConfig } from "../schema";
import { IJobConfig, ILoadConfigResult } from "../schema/types";
import { jobConfigSchema, optionalConfigSchema } from "../schema/validation";

export class FileConfigSource
  implements IConfigurationSource<Partial<IConfig & { jobs: IJobConfig[] }>>
{
  public readonly priority = 1;
  public readonly schema: z.ZodSchema<
    Partial<IConfig> & { jobs?: IJobConfig[] }
  >;
  public inputFileConfig: object | undefined;
  private jsonReader: JsonReader;

  public constructor(private readonly filePath: string) {
    this.jsonReader = new JsonReader();
    this.schema = optionalConfigSchema.extend({
      jobs: z.array(jobConfigSchema).default([])
    });
  }

  public async load(): Promise<ILoadConfigResult<Partial<IConfig>>> {
    try {
      this.inputFileConfig = await this.jsonReader.readJsonSync(this.filePath);
      const config = this.schema.parse(this.inputFileConfig);
      return {
        config: Config.merge<IConfig>(config),
        jobConfig: config.jobs?.map(job => JobConfig.merge<IJobConfig>(job)),
        input: this.inputFileConfig
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  private handleError(error: unknown): ILoadConfigResult<Partial<IConfig>> {
    logger.warn(
      `Failed to load configuration from ${this.filePath}: ${error instanceof Error ? error.message : String(error)}`
    );
    return {
      config: Config.merge<IConfig>({}),
      jobConfig: [],
      input: {}
    };
  }
}
