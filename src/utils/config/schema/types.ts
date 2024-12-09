import { LogLevelString } from "../../logger/Logger";

export const OUTPUT_FORMATS = {
  markdown: "md",
  html: "html"
} as const;

export type OutputFormats = typeof OUTPUT_FORMATS;
export type OutputFormat = keyof typeof OUTPUT_FORMATS;
export type OutputFormatName = keyof OutputFormats;
export type OutputFormatExtension = OutputFormats[OutputFormatName];
export type ConfigKeys = keyof IConfig;

export interface IJobConfig {
  name: string;
  description: string;
  pattern: string;
  outputFile: string;
  rootDir: string;
  excludePatterns: string[];
  maxFileSize: number;
  maxDepth: number;
  ignoreHiddenFiles: boolean;
  outputFormat: OutputFormatName[];
  followSymlinks: boolean;
  additionalIgnoreFiles: string[];
}

export type JobConfigOptions = Partial<IJobConfig> & { name?: string };

interface IConfigBase {
  name: string;
  templatesDir: string;
  codeConfigFile: string;
  logLevel: LogLevelString;
  verbose: boolean;
}

export interface IConfig extends IConfigBase {
  jobs?: IJobConfig[];
}

export type ConfigOptions = Partial<IConfig>;
