export abstract class BaseNode {
  protected _deep: number = 0;
  protected _size: number = 0;

  constructor(protected _name: string, protected _path: string) {}

  abstract bundle(deep: number): Promise<void>;
  abstract render(): void;
  abstract get secondaryProps(): Record<string, unknown> | undefined;

  get deep(): number {
    return this._deep;
  }
  get size(): number {
    return this._size;
  }
  get name(): string {
    return this._name;
  }
  get path(): string {
    return this._path;
  }

  get props() {
    return {
      name: this._name,
      path: this._path,
      deep: this._deep,
      size: this._size,
      ...this.secondaryProps
    };
  }
}