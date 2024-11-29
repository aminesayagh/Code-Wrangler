import { DocumentError } from "./DocumentError";

export class FileNotFoundError extends DocumentError {
  constructor(path: string) {
    super("File not found", path);
    this.name = "FileNotFoundError";
  }
}
