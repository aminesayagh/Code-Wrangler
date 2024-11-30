import { z } from "zod";
import { logger } from "../logger/Logger";
import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import {
  ConfigKeys,
  ConfigOptions,
  ConfigSchema,
  DEFAULT_CONFIG,
} from "./schema";

export class Config {
  private static instance: Config | undefined;
  private config: ConfigOptions;

  private constructor() {
    this.config = ConfigSchema.parse(DEFAULT_CONFIG);
  }

  public static async load(): Promise<Config> {
    if (!Config.instance) {
      Config.instance = new Config();
      await Config.instance.initialize();
    }
    return Config.instance;
  }
  private async initialize(): Promise<Config> {
    try {
      const currentDirConfig = DocumentFactory.join(
        process.cwd(),
        this.config.codeConfigFile
      );

      if (DocumentFactory.exists(currentDirConfig)) {
        const fileContent = await DocumentFactory.readFile(currentDirConfig);

        if (!fileContent.trim()) {
          throw new Error(`Configuration file is empty: ${currentDirConfig}`);
        }

        let userConfig;
        try {
          userConfig = JSON.parse(fileContent);
        } catch {
          throw new Error(
            `Invalid JSON in configuration file: ${currentDirConfig}`
          );
        }

        // Validate and merge configurations
        const validatedConfig = ConfigSchema.parse({
          ...this.config,
          ...userConfig,
        });

        this.config = validatedConfig;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        throw new Error(`Configuration validation failed: ${details}`);
      }
      throw error;
    }
    return this;
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
