import { DocumentError } from "./DocumentError";

export class FileNotFoundError extends DocumentError {
  public constructor(path: string) {
    super("File not found", path);
    this.name = "FileNotFoundError";
  }
}
