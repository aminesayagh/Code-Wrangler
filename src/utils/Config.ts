import fs from "fs";
import path from "path";
import { z } from "zod";
import { LOG_VALUES, logger } from "./Logger";

export const OutputFormatSchema = z.enum(["markdown"]);
export type OutputFormat = z.infer<typeof OutputFormatSchema>;

const ConfigSchema = z.object({
  dir: z.string(),
  rootDir: z.string(),
  pattern: z.string().regex(/^.*$/, "Pattern must be a valid regex"),
  outputFile: z.string(),
  logLevel: z.enum(LOG_VALUES as [string, ...string[]]),
  outputFormat: OutputFormatSchema,
  maxFileSize: z.number().positive(),
  excludePatterns: z.array(z.string()),
  ignoreHiddenFiles: z.boolean(),
  additionalIgnoreFiles: z.array(z.string()).optional(),
  codeConfigFile: z
    .string()
    .regex(/\.json$/, "Config file must end with .json"),
});

export type ConfigOptions = z.infer<typeof ConfigSchema>;

const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  pattern: ".*",
  outputFile: "output",
  logLevel: "INFO",
  outputFormat: "markdown",
  maxFileSize: 1048576,
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
  codeConfigFile: "codewrangler.json",
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
};

export class Config {
  private static instance: Config;
  private config: ConfigOptions;

  private constructor() {
    this.config = this.loodConfig();
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
  private loodConfig(): ConfigOptions {
    const defaultConfig = ConfigSchema.parse(DEFAULT_CONFIG);

    const currentDirConfig = path.join(
      process.cwd(),
      defaultConfig.codeConfigFile
    );
    if (fs.existsSync(currentDirConfig)) {
      const userConfig = JSON.parse(fs.readFileSync(currentDirConfig, "utf-8"));
      return { ...defaultConfig, ...userConfig };
    }

    return defaultConfig;
  }
  public get<T extends ConfigOptions[keyof ConfigOptions]>(
    key: keyof ConfigOptions
  ): ConfigOptions[keyof ConfigOptions] {
    return this.config[key] as T;
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

export const config = Config.getInstance();
export type ConfigInstance = Config;
