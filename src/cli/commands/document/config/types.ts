import { OutputFormat } from "../../../../utils/config";
import { ICommandOptions } from "../../base";

type ProgramOption = string | string[] | undefined;
export type ProgramRecord = Record<string, ProgramOption>;

export interface IDocumentCommandOptions extends ProgramRecord {
  name?: string;
  pattern?: string;
  format?: OutputFormat[];
  dir?: string;
  output?: string;
  exclude?: string;
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
