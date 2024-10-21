import * as fs from "fs/promises";

export class DocumentFactory {
  static async type(filePath: string): Promise<"file" | "directory"> {
    const stats = await fs.stat(filePath);
    if (stats && typeof stats.isDirectory === 'function' && stats.isDirectory()) {
      return "directory";
    }
    return "file";
  }
  static async size(filePath: string): Promise<number> {
    const stats = await fs.stat(filePath);
    return stats.size;
  }
  static async fileContent(filePath: string): Promise<string> {
    return await fs.readFile(filePath, "utf-8");
  }
  static async readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, "utf-8");
  }
}
