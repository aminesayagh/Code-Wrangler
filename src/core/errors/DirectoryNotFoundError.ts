import { DocumentError } from "./DocumentError";

export class DirectoryNotFoundError extends DocumentError {
  public constructor(path: string) {
    super("Directory not found", path);
    this.name = "DirectoryNotFoundError";
  }
}
