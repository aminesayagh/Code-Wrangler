import * as fs from "fs/promises";
import * as path from "path";
import { Document } from "../models/Document";
import { File } from "../models/File";
import { Directory } from "../models/Directory";

export class DocumentFactory {
  static async create(filePath: string): Promise<Document> {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      return new Directory(path.basename(filePath), filePath);
    } else {
      return new File(path.basename(filePath), filePath);
    }
  }
}