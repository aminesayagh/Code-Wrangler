import * as fs from "fs/promises";
import { DocumentTree } from "./DocumentTree";
import { FileSystem } from "../utils/FileSystem";

export class CodeWrangler {
  private documentTree: DocumentTree;

  constructor(private rootDir: string, private pattern: string, private outputFile: string) {
    this.documentTree = new DocumentTree(rootDir);
  }

  async execute(): Promise<void> {
    const files = await FileSystem.getFiles(this.rootDir, this.pattern);
    console.log(`Found ${files.length} files for pattern ${this.pattern} in ${this.rootDir}`);
    await this.documentTree.buildTree(files);
    const content = await this.documentTree.getContent();
    await fs.writeFile(`${this.outputFile}.md`, content);
    console.log(`Wrote content to ${this.outputFile}.md`);
  }
}