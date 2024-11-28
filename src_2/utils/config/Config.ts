import { z } from "zod";
import { logger } from "../logger/Logger";
import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import {
  ConfigSchema,
  ConfigOptions,
  DEFAULT_CONFIG,
  ConfigKeys,
} from "./shema";

export class Config {
  private static instance: Config | undefined;
  private config: ConfigOptions;

  private constructor() {
    this.config = this.loodConfig();
  }

  public static load(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
  private loodConfig(): ConfigOptions {
    const defaultConfig = ConfigSchema.parse(DEFAULT_CONFIG);

    const currentDirConfig = DocumentFactory.join(
      process.cwd(),
      defaultConfig.codeConfigFile
    );
    if (DocumentFactory.exists(currentDirConfig)) {
      const userConfig = JSON.parse(
        DocumentFactory.readFileSync(currentDirConfig)
      );
      return { ...defaultConfig, ...userConfig };
    }

    return defaultConfig;
  }
  public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
    return this.config[key] as ConfigOptions[T];
  }

  public set(
    key: keyof ConfigOptions,
    value: ConfigOptions[keyof ConfigOptions]
  ): void {
    const updatedConfig = { ...this.config, [key]: value };
    try {
      ConfigSchema.parse(updatedConfig);
      this.config = updatedConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Invalid configuration value: ${error.errors}`);
      }
      throw error;
    }
  }
  public getAll(): ConfigOptions {
    return this.config;
  }
  public reset(): void {
    this.config = DEFAULT_CONFIG;
  }
  public static destroy(): void {
    Config.instance = undefined;
  }
  public override(config: Partial<ConfigOptions>): void {
    const newOverrideConfig = { ...this.config, ...config };
    try {
      ConfigSchema.parse(newOverrideConfig);
      this.config = newOverrideConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Invalid configuration value: ${error.errors}`);
      }
      throw error;
    }
  }
}
