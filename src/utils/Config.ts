import fs from "fs";
import path from "path";
import { z } from "zod";
import { LOG_VALUES } from "./Logger";

export const OutputFormatSchema = z.enum(["markdown"]);
export type OutputFormat = z.infer<typeof OutputFormatSchema>;

const ConfigSchema = z.object({
  dir: z.string(),
  pattern: z.string().regex(/^.*$/, "Pattern must be a valid regex"),
  outputFile: z.string(),
  logLevel: z.enum(LOG_VALUES as [string, ...string[]]),
  outputFormat: OutputFormatSchema,
  maxFileSize: z.number().positive(),
  excludePatterns: z.array(z.string()),
  codeConfigFile: z
    .string()
    .regex(/\.json$/, "Config file must end with .json"),
});

export type ConfigOptions = z.infer<typeof ConfigSchema>;

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
    const defaultConfigPath = path.resolve(__dirname, "../defaultConfig.json");
    const defaultConfig = this.parseAndValidateConfig(defaultConfigPath);

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
  private parseAndValidateConfig(
    filePath: string,
    defaults?: Partial<ConfigOptions>
  ): ConfigOptions {
    try {
      const rawConfig = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const mergedConfig = defaults ? { ...defaults, ...rawConfig } : rawConfig;
      return ConfigSchema.parse(mergedConfig);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(
          `Configuration validation error in ${filePath}:`,
          error.errors
        );
      } else {
        console.error(
          `Error reading or parsing configuration file ${filePath}:`,
          error
        );
      }
      process.exit(1);
    }
  }
  public get(key: keyof ConfigOptions): ConfigOptions[keyof ConfigOptions] {
    return this.config[key];
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
        console.error(`Invalid configuration value:`, error.errors);
      }
      throw error;
    }
  }
  public getALl(): ConfigOptions {
    return this.config;
  }
  override(config: Partial<ConfigOptions>): void {
    this.config = { ...this.config, ...config };
  }
}

export const config = Config.getInstance();
