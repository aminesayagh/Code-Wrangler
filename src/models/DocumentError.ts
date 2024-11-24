export class DocumentError extends Error {
  constructor(message: string, public readonly path: string) {
    super(`Document error at ${path}: ${message}`);
    this.name = "DocumentError";
  }
}

export class FileNotFoundError extends DocumentError {
  constructor(path: string) {
    super("File not found", path);
    this.name = "FileNotFoundError";
  }
}

export class DirectoryNotFoundError extends DocumentError {
  constructor(path: string) {
    super("Directory not found", path);
    this.name = "DirectoryNotFoundError";
  }
}
