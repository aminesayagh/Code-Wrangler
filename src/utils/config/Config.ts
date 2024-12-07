import { z } from "zod";

import {
  ConfigKeys,
  ConfigOptions,
  DEFAULT_CONFIG,
  configSchema
} from "./schema";
import { logger } from "../logger/Logger";
import { IConfigurationSource } from "./ConfigBuilder";

export class Config {
  private static instance: Config | undefined;
  private config: ConfigOptions;
  private sources: IConfigurationSource<Partial<ConfigOptions>>[] = [];


  private constructor() {
    this.config = configSchema.parse(DEFAULT_CONFIG);
    logger.setConfig(this);
  }

  public static async load(): Promise<Config> {
    if (!Config.instance) {
      Config.instance = new Config();
      await Config.instance.loadSources();
    }
    return Config.instance;
  }

  public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
    return this.config[key] as ConfigOptions[T];
  }

  public set(
    key: keyof ConfigOptions,
    value: ConfigOptions[keyof ConfigOptions] | undefined
  ): void {
    if (value === undefined) {
      return;
    }
    const updatedConfig = { ...this.config, [key]: value };
    try {
      configSchema.parse(updatedConfig);
      this.config = updatedConfig;
    } catch (error) {
      this.handleConfigError(error);
    }
  }
  public getAll(): ConfigOptions {
    return this.config;
  }
  public reset(): void {
    logger.info("Resetting config to default");
    this.config = DEFAULT_CONFIG;
  }

  public addSource(source: IConfigurationSource<Partial<ConfigOptions>>): void {
    this.sources.push(source);
    this.sources.sort((a, b) => a.priority - b.priority);
    this.loadSources().catch(error => {
      logger.error("Failed to reload configuration sources", error);
    });
  }
  public static destroy(): void {
    Config.instance = undefined;
  }
  public static getInstance(): Config {
    if (!Config.instance) {
      throw new Error("Config must be initialized before use");
    }
    return Config.instance;
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
  private async loadSources(): Promise<void> {
    let mergedConfig = { ...DEFAULT_CONFIG };

    for (const source of this.sources) {
      try {
        const sourceConfig = await source.load();
        mergedConfig = { ...mergedConfig, ...sourceConfig };
      } catch (error) {
        logger.error(`Failed to load configuration from source: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    try {
      this.config = configSchema.parse(mergedConfig);
    } catch (error) {
      this.handleConfigError(error);
    }
  }
  private handleConfigError(error: unknown): void {
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
