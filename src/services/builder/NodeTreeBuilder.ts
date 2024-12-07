import FileHidden from "./FileHidden";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
import { FILE_TYPE, FileType } from "../../types/type";
import { IJobConfig, JobConfig } from "../../utils/config";

export interface INodeTree {
  name: string;
  path: string;
  type: FileType;
  children?: INodeTree[];
}

export interface INodeTreeBuilderOptions
  extends Pick<
    IJobConfig,
    | "additionalIgnoreFiles"
    | "maxDepth"
    | "excludePatterns"
    | "rootDir"
    | "followSymlinks"
  > {
  pattern: RegExp;
  returnType: "paths" | "details";
}

export class NodeTreeBuilder {
  private config: JobConfig;
  private options: INodeTreeBuilderOptions;
  private fileHidden: FileHidden;

  public constructor(config: JobConfig) {
    this.config = config;
    this.options = this.initializeOptions();
    this.fileHidden = new FileHidden(config);
  }

  public async build(): Promise<INodeTree> {
    const rootDir = this.options.rootDir;
    if (!documentFactory.exists(rootDir)) {
      throw new Error(`Directory ${rootDir} does not exist`);
    }
    return await this.buildTree(rootDir);
  }

  private initializeOptions(): INodeTreeBuilderOptions {
    return {
      rootDir: this.config.get("rootDir"),
      pattern: new RegExp(this.config.get("pattern")),
      maxDepth: this.config.get("maxDepth"),
      excludePatterns: this.config.get("excludePatterns"),
      additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
      returnType: "details",
      followSymlinks: false
    };
  }

  private async createNode(nodePath: string): Promise<INodeTree> {
    const stats = await fileStatsService(nodePath);
    const name = documentFactory.baseName(nodePath);

    return {
      name,
      path: nodePath,
      type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
    };
  }

  private shouldProcessChildren(node: INodeTree, depth: number): boolean {
    const isDirectory = node.type === FILE_TYPE.Directory;
    const withinDepthLimit =
      !this.options.maxDepth || depth < this.options.maxDepth;
    return isDirectory && withinDepthLimit;
  }

  private async processChildren(
    nodePath: string,
    depth: number
  ): Promise<INodeTree[]> {
    const entries = await documentFactory.readDir(nodePath);
    const children: INodeTree[] = [];

    for (const entry of entries) {
      const childNode = await this.processChild(nodePath, entry, depth);
      if (childNode) {
        children.push(childNode);
      }
    }

    return children;
  }

  private async processChild(
    parentPath: string,
    entry: string,
    depth: number
  ): Promise<INodeTree | null> {
    if (this.fileHidden.shouldExclude(entry)) {
      return null;
    }

    const childPath = documentFactory.join(parentPath, entry);
    return await this.buildTree(childPath, depth + 1);
  }

  private async buildTree(
    nodePath: string,
    depth: number = 0
  ): Promise<INodeTree> {
    const node = await this.createNode(nodePath);

    if (this.shouldProcessChildren(node, depth)) {
      node.children = await this.processChildren(nodePath, depth);
    }

    return node;
  }
}
