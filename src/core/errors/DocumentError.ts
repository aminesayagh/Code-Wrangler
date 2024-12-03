export class DocumentError extends Error {
  public constructor(
    message: string,
    public readonly path: string
  ) {
    super(`Document error at ${path}: ${message}`);
    this.name = "DocumentError";
  }
}
