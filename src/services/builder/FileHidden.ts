import { Config } from "../../utils/config";
import { minimatch } from "minimatch";

export default class FileHidden {
  private ignoreHiddenFiles: boolean;
  private patterns: string[];
  private additionalIgnoreFiles: string[];

  constructor(config: Config) {
    this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
    this.patterns = [...config.get("excludePatterns")];
    this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
  }

  public shouldExclude(fileName: string): boolean {
    if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
      return true;
    }

    if (this.patterns.some((pattern) => minimatch(fileName, pattern))) {
      return true;
    }

    if (this.additionalIgnoreFiles.some((file) => minimatch(fileName, file))) {
      // Additional ignore files are always excluded
      return true;
    }

    return false;
  }
}
