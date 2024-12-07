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
  
    public withOverride(override: Partial<ConfigOptions>): ConfigBuilder {
      this.config.override(override);
      return this;
    }
  
    public build(): Config {
      return this.config;
    }
  }
  