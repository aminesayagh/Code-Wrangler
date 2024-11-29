import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { BaseNode } from "./BaseNode";
import { RenderStrategy } from "../../services/renderer/RenderStrategy";

interface PropsFile {
  extension: string;
}

const defaultPropsFile: PropsFile = {
  extension: "",
};

export abstract class File extends BaseNode {
  private _propsFile: PropsFile = { ...defaultPropsFile };
  private _content: string | null = null;

  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this.initFile(name);
  }

  private initFile(name: string): void {
    this._propsFile = { ...defaultPropsFile };
    this.extension = DocumentFactory.extension(name);
    this._content = null;
  }

  // getters and setters
  // extension
  public get extension(): string {
    return this._propsFile.extension;
  }
  protected set extension(extension: string) {
    this._propsFile.extension = extension;
  }
  // content
  public get content(): string | null {
    return this._content;
  }
  protected set content(content: string | null) {
    this._content = content;
  }
  // secondary props
  public get secondaryProps(): Record<string, unknown> | undefined {
    return {
      extension: this.extension,
    };
  }

  // bundle
  public async bundle(deep: number = 0): Promise<void> {
    // set the deep of the file
    this.deep = deep;
    // set the size of the file
    this.size = await DocumentFactory.size(this.path);
    // set the content of the file
    this.content = await DocumentFactory.readFile(this.path);
    // set the stats of the file
    this.stats = await DocumentFactory.getStats(this.path);
  }

  // render
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

  // render
  public render(): void {
    this.renderStrategy.renderFile(this);
  }

  // dispose
  public override async dispose(): Promise<void> {
    await super.dispose();
    await this.renderStrategy.dispose();
  }
}
