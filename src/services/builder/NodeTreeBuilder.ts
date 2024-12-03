import FileHidden from "./FileHidden";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { FILE_TYPE, FileType } from "../../types/type";
import { Config, ConfigOptions } from "../../utils/config";

export interface INodeTree {
  name: string;
  path: string;
  type: FileType;
  children?: INodeTree[];
}

export interface INodeTreeBuilderOptions
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

export class NodeTreeBuilder {
  private config: Config;
  private options: INodeTreeBuilderOptions;
  private fileHidden: FileHidden;

  constructor(config: Config) {
    this.config = config;
    this.options = this.initializeOptions();
    this.fileHidden = new FileHidden(config);
  }

  public async build(): Promise<INodeTree> {
    const rootDir = this.options.dir;
    if (!documentFactory.exists(rootDir)) {
      throw new Error(`Directory ${rootDir} does not exist`);
    }
    return await this.buildTree(rootDir);
  }

  private initializeOptions(): INodeTreeBuilderOptions {
    return {
      dir: this.config.get("dir"),
      pattern: new RegExp(this.config.get("pattern")),
      maxDepth: this.config.get("maxDepth"),
      excludePatterns: this.config.get("excludePatterns"),
      additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
      returnType: "details",
      followSymlinks: false
    };
  }

  private async buildTree(
    nodePath: string,
    depth: number = 0
  ): Promise<INodeTree> {
    const stats = await documentFactory.getStats(nodePath);
    const name = documentFactory.baseName(nodePath);

    const node: INodeTree = {
      name,
      path: nodePath,
      type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
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
      const entries = await documentFactory.readDir(nodePath);
      const children: INodeTree[] = [];

      for (const entry of entries) {
        const childPath = documentFactory.join(nodePath, entry);

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
