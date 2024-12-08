import { z } from "zod";

import { IConfigurationSource } from "./interfaces/IConfigurationSource";
import { JsonReader } from "../../../infrastructure/filesystem/JsonReader";
import { logger } from "../../logger";
import { IConfig } from "../schema";
import { DEFAULT_CONFIG } from "../schema/defaults";
import { optionalConfigSchema } from "../schema/validation";

export class FileConfigSource
  implements IConfigurationSource<Partial<IConfig>>
{
  public readonly priority = 1;
  public readonly schema: z.ZodSchema<Partial<IConfig>>;
  public inputFileConfig: object | undefined;
  private jsonReader: JsonReader;

  public constructor(private readonly filePath: string) {
    this.jsonReader = new JsonReader();
    this.schema = optionalConfigSchema;
  }

  public async load(): Promise<Partial<IConfig>> {
    try {
      this.inputFileConfig = await this.jsonReader.readJsonSync(this.filePath);
      return optionalConfigSchema.parse(this.inputFileConfig);
    } catch (error) {
      logger.warn(
        `Failed to load configuration from ${this.filePath}: ${error instanceof Error ? error.message : String(error)}`
      );
      return DEFAULT_CONFIG;
    }
  }
}
