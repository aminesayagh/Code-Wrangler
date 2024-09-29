import * as path from "path";
import { Directory } from "../models/Directory";
import { DocumentFactory } from "../utils/DocumentFactory";

export class DocumentTree {
  private root: Directory;

  constructor(rootDir: string) {
    this.root = new Directory(path.basename(rootDir), rootDir);
  }

  async buildTree(files: string[]): Promise<void> {
    for (const file of files) {
      await this.addResource(file);
    }
  }

  private async addResource(filePath: string): Promise<void> {
    const relativePath = path.relative(this.root.path, filePath);
    const pathParts = relativePath.split(path.sep);
    let currentDir = this.root;

    for (let i = 0; i < pathParts.length - 1; i++) {
      const dirName = pathParts[i] as string;
      let existingDir = currentDir.children.find(child => child.name === dirName && child instanceof Directory) as Directory | undefined;
      if (!existingDir) {
        existingDir = new Directory(dirName, path.join(currentDir.path, dirName));
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