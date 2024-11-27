import * as fs from "fs";
import path from "path";
import { z } from "zod";
import { LOG_VALUES, logger } from "./Logger";

export const OutputFormatSchema = z.enum(["markdown", "html"]);
export const FileExtensionSchema = z.enum(["md", "html"]);
export type OutputFormat = z.infer<typeof OutputFormatSchema>;
export type FileExtension = z.infer<typeof FileExtensionSchema>;

export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
  markdown: "md",
  html: "html",
};

const ConfigSchema = z
  .object({
    dir: z.string(),
    rootDir: z.string(),
    pattern: z.string().regex(/^.*$/, "Pattern must be a valid regex"),
    outputFile: z.string(),
    logLevel: z.enum(LOG_VALUES as [string, ...string[]]),
    outputFormat: z.array(OutputFormatSchema),
    maxFileSize: z.number().positive(),
    excludePatterns: z.array(z.string()),
    ignoreHiddenFiles: z.boolean(),
    additionalIgnoreFiles: z.array(z.string()).optional(),
    projectName: z.string().optional(),
    codeConfigFile: z
      .string()
      .regex(/\.json$/, "Config file must end with .json"),
  })
  .strict();

export type ConfigOptions = z.infer<typeof ConfigSchema>;
// get a type listing all the keys of the config
export type ConfigKeys = keyof ConfigOptions;

export const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  pattern: ".*",
  outputFile: "output",
  logLevel: "INFO",
  outputFormat: ["markdown"],
  maxFileSize: 1048576,
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
  codeConfigFile: "codewrangler.json",
  projectName: undefined,
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
};

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
