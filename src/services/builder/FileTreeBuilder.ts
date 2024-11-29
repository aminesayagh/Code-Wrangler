import { Config, ConfigOptions } from "../../utils/config";
import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { FileType } from "../../types/type";
import { minimatch } from "minimatch";

export interface FileTreeNode {
  name: string;
  path: string;
  type: FileType;
  children?: FileTreeNode[];
}

export interface FileTreeBuilderOptions
  extends Pick<
    ConfigOptions,
    | "additionalIgnoreFiles"
    | "maxDepth"
    | "excludePatterns"
    | "dir"
    | "followSymlinks"
  > {
  pattern: RegExp;
  returnType: "paths" | "details";
}

class FileHidden {
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

export class FileTreeBuilder {
  private config: Config;
  private options: FileTreeBuilderOptions;
  private fileHidden: FileHidden;

  constructor(config: Config) {
    this.config = config;
    this.options = this.initializeOptions();
    this.fileHidden = new FileHidden(config);
  }

  private initializeOptions(): FileTreeBuilderOptions {
    return {
      dir: this.config.get("dir"),
      pattern: new RegExp(this.config.get("pattern")),
      maxDepth: this.config.get("maxDepth"),
      excludePatterns: this.config.get("excludePatterns"),
      additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
      returnType: "details",
      followSymlinks: false,
    };
  }
  public async build(): Promise<FileTreeNode> {
    const rootDir = this.options.dir;
    if (!DocumentFactory.exists(rootDir)) {
      throw new Error(`Directory ${rootDir} does not exist`);
    }
    return await this.buildTree(rootDir);
  }

  private async buildTree(
    nodePath: string,
    depth: number = 0
  ): Promise<FileTreeNode> {
    const stats = await DocumentFactory.getStats(nodePath);
    const name = DocumentFactory.baseName(nodePath);

    const node: FileTreeNode = {
      name,
      path: nodePath,
      type: stats.isDirectory ? FileType.Directory : FileType.File,
    };

    if (stats.isDirectory) {
      // Check depth limit
      if (
        this.options.maxDepth !== undefined &&
        depth >= this.options.maxDepth
      ) {
        return node;
      }

      // Read directory entries
      const entries = await DocumentFactory.readDir(nodePath);
      const children: FileTreeNode[] = [];

      for (const entry of entries) {
        const childPath = DocumentFactory.join(nodePath, entry);

        // Skip if should be excluded
        if (this.fileHidden.shouldExclude(entry)) {
          continue;
        }

        // Recursively build tree for child
        const childNode = await this.buildTree(childPath, depth + 1);
        children.push(childNode);
      }

      node.children = children;
    }

    return node;
  }
}
