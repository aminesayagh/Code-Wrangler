import fs from "fs/promises";

import { documentFactory } from "./DocumentFactory";
import { DocumentError } from "../../core/errors/DocumentError";
import { FileNotFoundError } from "../../core/errors/FileNotFoundError";

export class JsonReader {
  public async readJsonSync(filePath: string): Promise<object> {
    try {
      const absolutePath = this.validatePath(filePath);
      const content = await this.readFileContent(absolutePath, filePath);
      return this.parseJsonContent(content, filePath);
    } catch (error) {
      if (error instanceof DocumentError) {
        throw error;
      }
      throw new DocumentError(String(error), filePath);
    }
  }
  private validatePath(filePath: string): string {
    const absolutePath = documentFactory.resolve(filePath);
    if (!documentFactory.exists(absolutePath)) {
      throw new FileNotFoundError(filePath);
    }
    return absolutePath;
  }

  private async readFileContent(
    absolutePath: string,
    filePath: string
  ): Promise<string> {
    const content = await fs.readFile(absolutePath, "utf-8");
    if (!content) {
      throw new DocumentError(`File is empty`, filePath);
    }
    return content;
  }

  private parseJsonContent(content: string, filePath: string): object {
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
    }
  }
}

export const jsonReader = async (path: string): Promise<object> => {
  const jsonReader = new JsonReader();
  return await jsonReader.readJsonSync(path);
};
