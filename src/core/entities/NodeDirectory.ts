import { INodeContent, NodeBase } from "./NodeBase";
import { NodeFile } from "./NodeFile";
import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
import { IPropsDirectoryNode } from "../../types/type";

interface IPropsDirectory {
  length: number;
  deepLength: number;
  numberOfFiles: number;
  numberOfDirectories: number;
}

const defaultPropsDirectory: IPropsDirectory = {
  length: 0,
  deepLength: 0,
  numberOfFiles: 0,
  numberOfDirectories: 0
};

export abstract class NodeDirectory extends NodeBase {
  public readonly type = "directory";
  public children: (NodeFile | NodeDirectory)[] = [];
  private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };

  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this.initDirectory();
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
  public get numberOfFiles(): number {
    return this._propsDirectory.numberOfFiles;
  }
  public set numberOfFiles(numberOfFiles: number) {
    this._propsDirectory.numberOfFiles = numberOfFiles;
  }
  public override get props(): IPropsDirectoryNode {
    return {
      ...super.props,
      ...this._propsDirectory
    };
  }

  public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
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
    this.length = this.children.filter(child => child.type === "file").length;
    this.numberOfFiles =
      this.length +
      this.children
        .filter(child => child.type === "directory")
        .reduce((acc, child) => acc + child.numberOfFiles, 0);

    // set the deep length of the directory
    this.deepLength = this.children.reduce(
      (acc, child) =>
        acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
      0
    );

    // set the size of the directory
    this.size = this.children.reduce((acc, child) => acc + child.size, 0);

    // set stats
    this.stats = await fileStatsService(this.path);
  }

  public abstract override render(strategy: IRenderStrategy): INodeContent;

  private initDirectory(): void {
    this.children = [];
    this._propsDirectory = { ...defaultPropsDirectory };
  }
}

export class RenderableDirectory extends NodeDirectory {
  public override render(strategy: IRenderStrategy): INodeContent {
    return {
      content: strategy.renderDirectory(this)
    };
  }
}
