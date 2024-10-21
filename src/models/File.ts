import path from "path";
import { DocumentFactory } from "../utils/DocumentFactory";
import { BaseNode } from "./BaseNode";
import { RenderStrategy } from "./RenderStrategy";

export abstract class File extends BaseNode {
  public readonly _extension: string;
  private _content: string | null = null;
  public get children() {
    return this._content;
  }
  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this._extension = path.extname(name);
  }
  public get secondaryProps(): Record<string, unknown> | undefined {
    return {
      extension: this._extension
    }
  }
  public async bundle(deep: number = 0): Promise<void> {
    this._deep = deep;
    this._size = await DocumentFactory.size(this._path);
    this._content = await DocumentFactory.fileContent(this._path);
  }
  public abstract override render(): void;
}

export class RenderableFile extends File {
  constructor(
    name: string,
    pathName: string,
    private renderStrategy: RenderStrategy
  ) {
    super(name, pathName);
  }

  render(): void {
    this.renderStrategy.renderFile(this);
  }
}
