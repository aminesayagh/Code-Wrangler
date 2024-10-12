import { File } from "./File";
import { BaseNode } from "./BaseNode";
import { RenderStrategy } from "./RenderStrategy";

type ContentType = (string | ContentType)[];

export abstract class Directory extends BaseNode {
  public children: (File | Directory)[] = [];
  private _length: number = 0;
  private _deepLength: number = 0;
  private _content: ContentType = [];

  public get length(): number {
    return this._length;
  }
  public get deepLength(): number {
    return this._deepLength;
  }
  public get content(): ContentType {
    return this._content;
  }
  public get secondaryProps(): Record<string, unknown> {
    return {
      length: this._length,
      deepLength: this._deepLength,
    };
  }

  public async addChild(child: File | Directory): Promise<Directory> {
    if (!(child instanceof File || child instanceof Directory)) {
      throw new Error("Invalid child type");
    }
    this.children.push(child);
    return this;
  }

  public async bundle(deep: number = 0): Promise<void> {
    this._deep = deep;
    await Promise.all(this.children.map((child) => child.bundle(deep + 1)));
    this._length = this.children.filter(child => child instanceof File).length;
    this._deepLength = this.children.reduce(
      (acc, child) => acc + (child instanceof Directory ? child.deepLength + 1 : 1),
      0
    );
    this._size = this.children.reduce((acc, child) => acc + child.size, 0);
  }

  public abstract override render(): void;
}

export class RenderableDirectory extends Directory {
  constructor(
    name: string,
    pathName: string,
    private renderStrategy: RenderStrategy
  ) {
    super(name, pathName);
  }

  render(): string {
    return this.renderStrategy.renderDirectory(this);
  }
}
