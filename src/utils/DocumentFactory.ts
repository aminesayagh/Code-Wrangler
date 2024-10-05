import * as fs from "fs/promises";
import * as path from "path";
import { File } from "../models/File";
import { Directory } from "../models/Directory";

export class DocumentFactory {
  static async create(filePath: string): Promise<File | Directory> {
    const stats = await fs.stat(filePath);
    const name = path.basename(filePath);
    if (stats && typeof stats.isDirectory === 'function' && stats.isDirectory()) {
      return new Directory(name, filePath);
    }

    return new File(name, filePath, stats.size);
  }
}