import { File } from "./File";
import { BaseNode } from "./BaseNode";
import { RenderStrategy } from "../../services/renderer/RenderStrategy";
import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";

type ContentType = (string | ContentType)[];

interface PropsDirectory {
  length: number;
  deepLength: number;
}

const defaultPropsDirectory: PropsDirectory = {
  length: 0,
  deepLength: 0,
};

export abstract class Directory extends BaseNode {
  public children: (File | Directory)[] = [];
  private _propsDirectory: PropsDirectory = { ...defaultPropsDirectory };
  private _content: ContentType = [];

  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this.initDirectory();
  }

  private initDirectory(): void {
    this.children = [];
    this._propsDirectory = { ...defaultPropsDirectory };
    this._content = [];
  }

  // getters and setters
  public get length(): number {
    return this._propsDirectory.length;
  }
  public set length(length: number) {
    this._propsDirectory.length = length;
  }
  public get deepLength(): number {
    return this._propsDirectory.deepLength;
  }
  public set deepLength(deepLength: number) {
    this._propsDirectory.deepLength = deepLength;
  }
  public get content(): ContentType {
    return this._content;
  }
  public set content(content: ContentType) {
    this._content = content;
  }
  public get secondaryProps(): Record<string, unknown> {
    return {
      ...this._propsDirectory,
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
    // set the deep of the directory
    this.deep = deep;

    // bundle all children
    await Promise.all(this.children.map((child) => child.bundle(deep + 1)));

    // set the length of the directory
    this.length = this.children.filter((child) => child instanceof File).length;

    // set the deep length of the directory
    this.deepLength = this.children.reduce(
      (acc, child) =>
        acc + (child instanceof Directory ? child.deepLength + 1 : 1),
      0
    );

    // set the size of the directory
    this.size = this.children.reduce((acc, child) => acc + child.size, 0);

    // set stats
    this.stats = await DocumentFactory.getStats(this.path);
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
