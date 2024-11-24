import { promises as fs } from "fs";
import * as path from "path";
import { Config } from "./Config";
import { logger } from "./Logger";
import { minimatch } from "minimatch";
import { DocumentFactory } from "./DocumentFactory";

class IgnorePatternHandler {
  private patterns: string[] = [];
  private readonly ignoreHiddenFiles: boolean;
  private readonly excludePatterns: string[];
  private readonly additionalIgnoreFiles: string[];

  constructor(config: Config) {
    this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
    this.excludePatterns = config.get("excludePatterns") as string[];
    this.additionalIgnoreFiles = config.get(
      "additionalIgnoreFiles"
    ) as string[];
    this.patterns = [...this.excludePatterns];
    this.loadIgnorePatterns(
      config.get("rootDir") as string,
      this.additionalIgnoreFiles
    );
  }

  public shouldExclude(filePath: string): boolean {
    return this.patterns.some((pattern) =>
      minimatch(filePath, pattern, { dot: !this.ignoreHiddenFiles })
    );
  }

  async loadIgnorePatterns(dir: string, ignoreFile: string[]): Promise<void> {
    for (const file of ignoreFile) {
      const filePath = path.join(dir, file);
      try {
        const fileExists = await DocumentFactory.exists(filePath);
        if (fileExists && (await fs.stat(filePath)).isFile()) {
          const content = await fs.readFile(filePath, "utf8");
          this.patterns.push(
            ...content
              .split("\n")
              .map((pattern) => pattern.trim())
              .filter((pattern) => pattern && !pattern.startsWith("#"))
          );
        }
      } catch (error) {
        logger.error(`Error reading ignore file ${filePath}: ${error}`);
      }
    }
  }
}

export class FileSystem {
  static async getFiles(dir: string, pattern: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const ignorePatternHandler = new IgnorePatternHandler(Config.load());
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        if (ignorePatternHandler.shouldExclude(res)) {
          return [];
        }
        return dirent.isDirectory() ? FileSystem.getFiles(res, pattern) : res;
      })
    );
    return Array.prototype
      .concat(...files)
      .filter((file) => new RegExp(pattern).test(file));
  }
}
