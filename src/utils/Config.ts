import { z } from "zod";
import { LOG_VALUES, logger } from "./Logger";
import { DocumentFactory } from "./DocumentFactory";

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
    dir: z.string().default(process.cwd()),
    rootDir: z.string().default(process.cwd()),
    pattern: z
      .string()
      .regex(/^.*$/, "Pattern must be a valid regex")
      .default(".*"),
    outputFile: z.string().default("output"),
    logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
    outputFormat: z.array(OutputFormatSchema).default(["markdown"]),
    maxFileSize: z.number().positive().default(1048576),
    maxDepth: z.number().default(100),
    excludePatterns: z
      .array(z.string())
      .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
    ignoreHiddenFiles: z.boolean().default(true),
    additionalIgnoreFiles: z.array(z.string()).optional().default([]),
    projectName: z.string().optional(),
    followSymlinks: z.boolean().default(false),
    codeConfigFile: z
      .string()
      .regex(/\.json$/, "Config file must end with .json")
      .default("codewrangler.json"),
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
  maxDepth: 100,
  codeConfigFile: "codewrangler.json",
  projectName: undefined,
  followSymlinks: false,
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
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
