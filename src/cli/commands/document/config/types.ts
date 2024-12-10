import { OutputFormat } from "../../../../utils/config";
import { ICommandOptions } from "../../base";

export interface IDocumentCommandOptions
  extends Record<string, string | undefined> {
  name?: string;
  pattern?: string;
  outputFormat?: OutputFormat;
  rootDir?: string;
  outputFile?: string;
  excludePatterns?: string;
  ignoreHidden?: string;
  additionalIgnore?: string;
  followSymlinks?: string;
  verbose?: string;
}

export interface IDocumentCommandConfig extends ICommandOptions {
  name?: string;
  pattern: string;
  outputFormat: OutputFormat[];
  rootDir: string;
  outputFile?: string;
  excludePatterns?: string[];
  ignoreHidden: boolean;
  additionalIgnore?: string[];
  followSymlinks: boolean;
  verbose: boolean;
}
