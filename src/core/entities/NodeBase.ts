import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
import { IFileStats, IPropsNode } from "../../types/type";

const defaultProps: IPropsNode = {
  name: "",
  path: "",
  deep: 0,
  size: 0, // size of the node from the children nodes
  stats: {
    size: 0, // size of the node from the file system
    created: new Date(),
    modified: new Date(),
    accessed: new Date(),
    isDirectory: false,
    isFile: false,
    permissions: {
      readable: false,
      writable: false,
      executable: false
    }
  }
};

export interface INodeContent {
  content: string;
}

interface INodeLifeCycle {
  validate: () => boolean;
  bundle: (deep: number) => Promise<void>;
  render: (strategy: IRenderStrategy) => INodeContent;
  dispose: () => void;
  clone: () => NodeBase;
}

export abstract class NodeBase implements INodeLifeCycle {
  protected _props: IPropsNode = { ...defaultProps };

  public constructor(
    _name: string,
    private originalPath: string
  ) {
    this.initNode(_name, originalPath);
    this.validate();
  }

  public validate(): boolean {
    if (!documentFactory.exists(this.path)) {
      throw new Error(`Path ${this.originalPath} does not exist`);
    }
    if (!documentFactory.isAbsolute(this.path)) {
      throw new Error(`Path ${this.originalPath} is not absolute`);
    }
    return true;
  }

  // abstract methods
  public abstract bundle(deep: number): Promise<void>;
  public abstract render(strategy: IRenderStrategy): INodeContent;

  // getters and setters
  // deep
  public get deep(): number {
    return this._props.deep;
  }
  public set deep(deep: number) {
    this._props.deep = deep;
  }

  // size
  public get size(): number {
    return this._props.size;
  }
  public set size(size: number) {
    this._props.size = size;
  }

  // name
  public get name(): string {
    return this._props.name;
  }
  public set name(name: string) {
    this._props.name = name;
  }

  // path
  public get path(): string {
    return this._props.path;
  }
  public set path(path: string) {
    this._props.path = path;
  }

  // stats
  public get stats(): IFileStats | undefined {
    return this._props.stats;
  }
  public set stats(stats: IFileStats | undefined) {
    this._props.stats = stats;
  }

  // props
  public get props(): IPropsNode {
    return {
      ...this._props
    };
  }

  public dispose(): void {
    this._props = { ...defaultProps };
  }

  public clone(): NodeBase {
    return Object.assign(Object.create(this), this);
  }

  private initNode(name: string, path: string): void {
    this.deep = 0;
    this.size = 0;
    this.name = name;
    this.path = documentFactory.resolve(path);
  }
}
