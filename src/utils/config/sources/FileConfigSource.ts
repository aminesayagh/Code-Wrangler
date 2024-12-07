
import { IConfigurationSource } from "./interfaces/IConfigurationSource";
import { JsonReader } from "../../../infrastructure/filesystem/JsonReader";
import { logger } from "../../logger";
import { ConfigOptions } from "../schema";
import { DEFAULT_CONFIG } from "../schema/defaults";
import { optionalConfigSchema } from "../schema/validation";

export class FileConfigSource implements IConfigurationSource<ConfigOptions> {
  public readonly priority = 1;
  private jsonReader: JsonReader;

  public constructor(private readonly filePath: string) {
    this.jsonReader = new JsonReader();
  }

  public async load(): Promise<ConfigOptions> {
    try {
      const config = await this.jsonReader.readJsonSync(this.filePath);
      return optionalConfigSchema.parse(config);
    } catch (error) {
      logger.warn(`Failed to load configuration from ${this.filePath}: ${error instanceof Error ? error.message : String(error)}`);
      return DEFAULT_CONFIG;
    }
  }
}