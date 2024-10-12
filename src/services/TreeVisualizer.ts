import { Directory } from "../models/Directory";
import { File } from "../models/File";
import { Document } from "../models/Document";
import path from "path";

export class TreeVisualizer {
  static async generateTree(files: string[], rootDir: string): Promise<string> {
    const root = new Directory(path.basename(rootDir), rootDir);
    await this.buildTree(root, files, rootDir);
    return this.generateTreeString(root, "", true);
  }

  private static async buildTree(
    root: Directory,
    files: string[],
    rootDir: string
  ): Promise<void> {
    for (const file of files) {
      const relativePath = path.relative(rootDir, file);
      const parts = relativePath.split(path.sep);
      let currentDir = root;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i] as string;
        if (i === parts.length - 1) {
          const newFile = new File(part, file);
          await currentDir.addChild(newFile);
        } else {
          // It's a directory
          let child = currentDir.children.find(
            (c) => c.name === part
          ) as Directory;
          if (!child) {
            child = new Directory(part, path.join(currentDir.path, part));
            await currentDir.addChild(child);
          }
          currentDir = child;
        }
      }
    }
  }

  private static generateTreeString(node: Document, prefix: string, isLast: boolean): string {
    const nodePrefix = isLast ? "└── " : "├── ";
    let result = prefix + nodePrefix + node.name + "\n";

    if (node instanceof Directory && node.children.length > 0) {
      const childPrefix = prefix + (isLast ? "    " : "│   ");
      const sortedChildren = node.children.sort((a, b) => {
        if (a instanceof Directory && b instanceof File) return -1;
        if (a instanceof File && b instanceof Directory) return 1;
        return a.name.localeCompare(b.name);
      });

      sortedChildren.forEach((child, index) => {
        const isLastChild = index === sortedChildren.length - 1;
        result += this.generateTreeString(child, childPrefix, isLastChild);
      });
    }

    return result;
  }
}
