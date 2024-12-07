import { Config } from "./Config";
import { ConfigOptions, DEFAULT_CONFIG, configSchema } from "./schema";
import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
import { logger } from "../logger";

export interface IConfigurationSource<T extends Partial<ConfigOptions>> {
  readonly priority: number;
  load: () => Promise<T>;
}

export class FileConfigSource implements IConfigurationSource<ConfigOptions> {
  public readonly priority = 1;
  private jsonReader: JsonReader;

  public constructor(private readonly filePath: string) {
    this.jsonReader = new JsonReader();
  }

  public async load(): Promise<ConfigOptions> {
    try {
      const config = await this.jsonReader.readJsonSync(this.filePath);
      return configSchema.parse(config);
    } catch (error) {
      logger.warn(
        `Failed to load configuration from ${this.filePath}: ${error instanceof Error ? error.message : String(error)}`
      );
      return DEFAULT_CONFIG;
    }
  }
}

export abstract class CLIConfigSource<T extends Record<string, unknown>>
  implements IConfigurationSource<T>
{
  public readonly priority = 2;

  public constructor(
    private readonly args: string[],
    private readonly options: T
  ) {}

  public abstract load(): Promise<T>;
}



export class ConfigBuilder {
  private static instance: ConfigBuilder;
  private config: Config;

  private constructor(config: Config) {
    this.config = config;
  }

  public static async create(): Promise<ConfigBuilder> {
    if (!ConfigBuilder.instance) {
      await Config.load();
      ConfigBuilder.instance = new ConfigBuilder(Config.getInstance());
    }
    return ConfigBuilder.instance;
  }

  public withFileConfig(filePath: string): ConfigBuilder {
    this.config.addSource(new FileConfigSource(filePath));
    return this;
  }

  public withCLIConfig(cliConfig: CLIConfigSource<Record<string, unknown>>): ConfigBuilder {
    this.config.addSource(cliConfig);
    return this;
  }

  public build(): Config {
    return this.config;
  }
}
