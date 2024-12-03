import { z } from "zod";

import {
  ConfigKeys,
  ConfigOptions,
  DEFAULT_CONFIG,
  configSchema
} from "./schema";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
import { logger } from "../logger/Logger";

export class Config {
  private static instance: Config | undefined;
  private config: ConfigOptions;
  private jsonReader: JsonReader;

  private constructor() {
    this.jsonReader = new JsonReader();
    this.config = configSchema.parse(DEFAULT_CONFIG);
  }

  public static async load(): Promise<Config> {
    if (!Config.instance) {
      Config.instance = new Config();
      await Config.instance.loadUserConfig();
    }
    return Config.instance;
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
      configSchema.parse(updatedConfig);
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
      configSchema.parse(newOverrideConfig);
      this.config = newOverrideConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Invalid configuration value: ${error.errors}`);
      }
      throw error;
    }
  }

  private async loadUserConfig(): Promise<void> {
    try {
      const configPath = documentFactory.resolve(this.config.codeConfigFile);
      const userConfig = await this.jsonReader.readJsonSync(configPath);
      this.config = configSchema.parse({ ...this.config, ...userConfig });
    } catch (error) {
      this.handleConfigError(error);
    }
  }

  private handleConfigError(error: unknown): void {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map(err => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Configuration validation failed: ${details}`);
    }
    throw error;
  }
}
