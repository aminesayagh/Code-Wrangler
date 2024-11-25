import { FileStats, PropsNode } from "./type";
import { DocumentFactory } from "../utils/DocumentFactory";

const defaultProps: PropsNode = {
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
      executable: false,
    },
  },
};

export abstract class BaseNode {
  protected _props: PropsNode = { ...defaultProps };

  constructor(_name: string, _path: string) {
    // check if path is absolute or a valid path
    this.initNode(_name, _path);
    this.validate();
  }

  private validatePath(path: string): boolean {
    if (!DocumentFactory.exists(path)) {
      throw new Error("Path does not exist");
    }
    if (!DocumentFactory.isAbsolute(path)) {
      throw new Error("Path is not absolute");
    }
    return true;
  }

  public validate(): boolean {
    return this.validatePath(this.path);
  }

  private initNode(name: string, path: string): void {
    this.deep = 0;
    this.size = 0;
    this.name = name;
    this.path = DocumentFactory.resolve(path);
  }

  // abstract methods
  abstract bundle(deep: number): Promise<void>;
  abstract render(): void;
  abstract get secondaryProps(): Record<string, unknown> | undefined;

  // getters and setters
  // deep
  get deep(): number {
    return this._props.deep;
  }
  protected set deep(deep: number) {
    this._props.deep = deep;
  }

  // size
  get size(): number {
    return this._props.size;
  }
  protected set size(size: number) {
    this._props.size = size;
  }

  // name
  get name(): string {
    return this._props.name;
  }
  protected set name(name: string) {
    this._props.name = name;
  }

  // path
  get path(): string {
    return this._props.path;
  }
  protected set path(path: string) {
    this._props.path = path;
  }

  // stats
  get stats(): FileStats {
    return this._props.stats;
  }
  protected set stats(stats: FileStats) {
    this._props.stats = stats;
  }

  // props
  get props() {
    return { ...this._props, ...this.secondaryProps };
  }

  public async dispose(): Promise<void> {
    this._props.deep = 0;
    this._props.path = "";
    this._props.name = "";
    this._props.stats = { ...defaultProps.stats };
    this._props.size = 0;
    this._props = { ...defaultProps };
  }

  public async clone(): Promise<BaseNode> {
    return Object.assign(Object.create(this), this);
  }
}
