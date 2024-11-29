export class DocumentError extends Error {
  constructor(message: string, public readonly path: string) {
    super(`Document error at ${path}: ${message}`);
    this.name = "DocumentError";
  }
}
