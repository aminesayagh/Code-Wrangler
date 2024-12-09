import { ICommandOptions } from "../../base";

export interface IDocumentCommandOptions extends ICommandOptions {
  name: string;
  pattern: string;
  outputFormat: string;
  rootDir: string;
  outputFile?: string;
  excludePatterns?: string[];
  ignoreHidden: boolean;
  additionalIgnore?: string[];
  followSymlinks: boolean;
  verbose: boolean;
}
