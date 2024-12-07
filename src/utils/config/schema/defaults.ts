import { IConfig, IJobConfig, OutputFormat } from "./types";
import { LogLevelString } from "../../logger/Logger";

export const DEFAULT_JOB_CONFIG: Partial<IJobConfig> = {
  rootDir: process.cwd(),
  outputFormat: ["markdown"] as OutputFormat[],
  excludePatterns: [],
  maxFileSize: 1048576,
  maxDepth: 100,
  ignoreHiddenFiles: true,
  additionalIgnoreFiles: [],
  followSymlinks: false
};

export const DEFAULT_CONFIG: IConfig = {
  projectName: "CodeWrangler",
  templatesDir: "public/templates", // TODO: 
  codeConfigFile: "public/codewrangler.json",
  logLevel: "INFO" as LogLevelString,
  verbose: false,
  jobs: []
};
