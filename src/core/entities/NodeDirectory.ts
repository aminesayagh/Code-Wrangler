import { NodeFile } from "./NodeFile";
import { NodeBase } from "./NodeBase";
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";

interface IPropsDirectory {
  length: number;
  deepLength: number;
}

const defaultPropsDirectory: IPropsDirectory = {
  length: 0,
  deepLength: 0
};

export abstract class NodeDirectory extends NodeBase {
  public children: (NodeFile | NodeDirectory)[] = [];
  private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };

  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this.initDirectory();
  }

  private initDirectory(): void {
    this.children = [];
    this._propsDirectory = { ...defaultPropsDirectory };
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
  public get secondaryProps(): Record<string, unknown> {
    return {
      ...this._propsDirectory
    };
  }

  public async addChild(
    child: NodeFile | NodeDirectory
  ): Promise<NodeDirectory> {
    if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
      throw new Error("Invalid child type");
    }
    this.children.push(child);
    return this;
  }

  public async bundle(deep: number = 0): Promise<void> {
    // set the deep of the directory
    this.deep = deep;

    // bundle all children
    await Promise.all(this.children.map(child => child.bundle(deep + 1)));

    // set the length of the directory
    this.length = this.children.filter(
      child => child instanceof NodeFile
    ).length;

    // set the deep length of the directory
    this.deepLength = this.children.reduce(
      (acc, child) =>
        acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
      0
    );

    // set the size of the directory
    this.size = this.children.reduce((acc, child) => acc + child.size, 0);

    // set stats
    this.stats = await DocumentFactory.getStats(this.path);
  }

  public abstract override render(): void;
}

export class RenderableDirectory extends NodeDirectory {
  constructor(
    name: string,
    pathName: string,
    private renderStrategy: IRenderStrategy[]
  ) {
    super(name, pathName);
  }

  public render(): void {
    this.renderStrategy.map(strategy => strategy.renderDirectory(this));
  }
}
