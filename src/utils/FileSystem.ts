import * as fs from "fs/promises";
import * as path from "path";

export class FileSystem {
  static async getFiles(dir: string, pattern: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? FileSystem.getFiles(res, pattern) : res;
    }));
    return Array.prototype.concat(...files).filter((file) => new RegExp(pattern).test(file));
  }
}