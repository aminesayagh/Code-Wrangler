import { z } from "zod";

import { JobManager } from "./JobManager";
import { logger } from "../../logger";
import {
  ConfigKeys,
  ConfigOptions,
  DEFAULT_CONFIG,
  IConfig,
  configSchema
} from "../schema";
import { IConfigurationSource } from "../sources/interfaces/IConfigurationSource";

export class Config {
  private static instance: Config | undefined;
  private config: IConfig;
  private sources: IConfigurationSource<Partial<ConfigOptions>>[] = [];
  private jobManager: JobManager;

  /**
   * Constructor for the Config class.
   */
  private constructor() {
    this.config = configSchema.parse(DEFAULT_CONFIG);
    this.jobManager = new JobManager();
    logger.setConfig(Config.getInstance());
  }

  /**
   * Loads the configuration.
   * @returns The Config instance.
   */
  public static async load(): Promise<Config> {
    if (!Config.instance) {
      Config.instance = new Config();
      await Config.instance.loadSources();
    }
    return Config.instance;
  }

  /**
   * Returns a configuration value.
   * @param key - The key to get.
   * @returns The configuration value.
   */
  public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
    return this.config[key] as ConfigOptions[T];
  }

  /**
   * Sets a configuration value.
   * @param key - The key to set.
   * @param value - The value to set.
   */
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

  /**
   * Returns the entire configuration.
   * @returns The entire configuration.
   */
  public getAll(): ConfigOptions {
    return this.config;
  }

  /**
   * Resets the configuration to the default values.
   */
  public reset(): void {
    logger.info("Resetting config to default");
    this.config = DEFAULT_CONFIG;
  }

  /**
   * Adds a new configuration source.
   * @param source - The configuration source to add.
   */
  public addSource(source: IConfigurationSource<Partial<ConfigOptions>>): void {
    this.sources.push(source);
    this.sources.sort((a, b) => a.priority - b.priority);
    this.loadSources().catch(error => {
      logger.error("Failed to reload configuration sources", error);
    });
  }

  /**
   * Destroys the Config instance.
   */
  public static destroy(): void {
    Config.instance = undefined;
  }

  /**
   * Returns the Config instance.
   * @returns The Config instance.
   * @throws An error if the Config instance is not initialized.
   */
  public static getInstance(): Config {
    if (!Config.instance) {
      throw new Error("Config must be initialized before use");
    }
    return Config.instance;
  }

  /**
   * Overrides the configuration with a new set of values.
   * @param config - The new configuration values.
   */
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

  /**
   * Loads the configuration sources.
   */
  public async loadSources(): Promise<void> {
    let mergedConfig = { ...DEFAULT_CONFIG };

    await this.navigateSource(async source => {
      const sourceConfig = await source.load();
      // Merge jobs separately
      if (sourceConfig.jobs) {
        this.jobManager.mergeJobs(sourceConfig.jobs);
      }
      // Merge other config properties
      mergedConfig = {
        ...mergedConfig,
        ...sourceConfig,
        jobs: this.jobManager.getJobs()
      };
    });

    this.validate(mergedConfig);
  }

  /**
   * Navigates through the configuration sources.
   * @param callback - The callback to execute for each source.
   */
  private async navigateSource(
    callback: (
      source: IConfigurationSource<Partial<ConfigOptions>>
    ) => Promise<void>
  ): Promise<void> {
    for (const source of this.sources) {
      try {
        await callback(source);
      } catch (error) {
        logger.error(
          `Failed to navigate configuration source: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
  }

  /**
   * Validates the configuration.
   * @param config - The configuration to validate.
   */
  private validate(config: IConfig): void {
    try {
      this.config = configSchema.parse(config);
    } catch (error) {
      this.handleConfigError(error);
    }
  }

  /**
   * Handles configuration validation errors.
   * @param error - The error to handle.
   * @throws An error if the configuration is invalid.
   */
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
