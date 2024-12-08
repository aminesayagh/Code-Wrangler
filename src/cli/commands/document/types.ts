export interface IDocumentCommandOptions {
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
