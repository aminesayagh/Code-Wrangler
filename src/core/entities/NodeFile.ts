import { INodeContent, NodeBase } from "./NodeBase";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";

interface IPropsFile {
  extension: string;
}

const defaultPropsFile: IPropsFile = {
  extension: ""
};

export abstract class NodeFile extends NodeBase {
  private _propsFile: IPropsFile = { ...defaultPropsFile };
  private _content: string | null = null;

  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this.initFile(name);
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
      extension: this.extension
    };
  }

  // bundle
  public async bundle(deep: number = 0): Promise<void> {
    // set the deep of the file
    this.deep = deep;
    // set the size of the file
    this.size = await documentFactory.size(this.path);
    // set the content of the file
    this.content = await documentFactory.readFile(this.path);
    // set the stats of the file
    this.stats = await fileStatsService(this.path);
  }

  // render
  public abstract override render(strategy: IRenderStrategy): INodeContent;

  private initFile(name: string): void {
    this._propsFile = { ...defaultPropsFile };
    this.extension = documentFactory.extension(name);
    this._content = null;
  }
}

export class RenderableFile extends NodeFile {
  // render
  public override render(strategy: IRenderStrategy): INodeContent {
    return {
      content: strategy.renderFile(this)
    };
  }

  // dispose
  public override async dispose(): Promise<void> {
    await super.dispose();
  }
}
