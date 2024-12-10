import { IConfig, IJobConfig, OutputFormat } from "./types";
import { LogLevelString } from "../../logger/Logger";

export const DEFAULT_OUTPUT_FORMAT: OutputFormat[] = ["markdown"];

export const DEFAULT_NAME_PREFIX = "config-code-wrangler";

export const DEFAULT_JOB_CONFIG: Omit<IJobConfig, "name"> = {
  description: "Default job",
  rootDir: process.cwd(),
  outputFormat: ["markdown"] as OutputFormat[],
  excludePatterns: [],
  maxFileSize: 1048576,
  maxDepth: 100,
  ignoreHiddenFiles: true,
  additionalIgnoreFiles: [],
  followSymlinks: false,
  pattern: "**/*",
  outputFile: "output.md"
};



export const DEFAULT_CONFIG: Omit<IConfig, "name"> = {
  templatesDir: "public/templates", // TODO:
  codeConfigFile: "public/codewrangler.json",
  logLevel: "INFO" as LogLevelString,
  verbose: false,
  jobs: []
};
