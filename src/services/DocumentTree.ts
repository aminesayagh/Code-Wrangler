import * as path from "path";
import { Directory } from "../models/Directory";
import { DocumentFactory } from "../utils/DocumentFactory";
import { config } from "../utils/Config";
import { logger } from "../utils/Logger";
import { promises as fs } from "fs";

export class DocumentTree {
  private root: Directory;

  constructor(rootDir: string) {
    this.root = new Directory(path.basename(rootDir), rootDir);
  }

  async buildTree(files: string[]): Promise<void> {
    const maxFileSize = config.get("maxFileSize") as number;
    for (const file of files) {
      await this.addResource(file, {
        maxFileSize,
      });
    }
  }

  private async addResource(filePath: string, options: { maxFileSize: number }): Promise<void> {
    const stats = await fs.stat(filePath);
    if (stats.size > options.maxFileSize) {
      logger.info(`Skipping file ${filePath} as it exceeds the maximum file size (${stats.size} > ${options.maxFileSize} bytes)`);
      return;
    }
    const relativePath = path.relative(this.root.path, filePath);
    const pathParts = relativePath.split(path.sep);
    let currentDir = this.root;

    for (let i = 0; i < pathParts.length - 1; i++) {
      const dirName = pathParts[i] as string;
      let existingDir = currentDir.children.find(
        (child) => child.name === dirName && child instanceof Directory
      ) as Directory | undefined;
      if (!existingDir) {
        existingDir = new Directory(
          dirName,
          path.join(currentDir.path, dirName)
        );
        await currentDir.addChild(existingDir);
      }
      currentDir = existingDir;
    }

    const document = await DocumentFactory.create(filePath);
    await currentDir.addChild(document);
  }

  async getContent(): Promise<string> {
    return this.root.getContent();
  }
}
