import { ProgramRecord } from "../../../cli/commands/document/config/types";
import { logger } from "../../logger";
import { Config } from "../core";
import { ConfigOptions } from "../schema";
import { CLIConfigSource } from "../sources/CLIConfigSource";
import { FileConfigSource } from "../sources/FileConfigSource";

export class ConfigBuilder {
  private static instance: ConfigBuilder;
  private config: Config;

  private constructor(config: Config) {
    this.config = config;
  }

  public static async create(): Promise<ConfigBuilder> {
    if (!ConfigBuilder.instance) {
      ConfigBuilder.instance = new ConfigBuilder(await Config.load());
      logger.info("ConfigBuilder created");
    }
    return ConfigBuilder.instance;
  }

  public withFileConfig(filePath: string): ConfigBuilder {
    this.config.addSource(new FileConfigSource(filePath));
    return this;
  }

  public withCLIConfig<
    I extends ProgramRecord,
    V extends object,
    O extends object
  >(cliConfig: CLIConfigSource<I, V, O>): ConfigBuilder {
    this.config.addSource(cliConfig);
    return this;
  }

  public withOverride(override: Partial<ConfigOptions>): ConfigBuilder {
    this.config.override(override);
    return this;
  }

  public build(): Config {
    this.config.loadSources().catch(error => {
      logger.error("Failed to load configuration sources", error);
    });
    return this.config;
  }

  public reset(): void {
    this.config.reset();
  }
}
