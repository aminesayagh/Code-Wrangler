import { NodeDirectory } from "../../core/entities/NodeDirectory";
import { NodeFile } from "../../core/entities/NodeFile";
import { Template } from "../../infrastructure/templates/TemplateEngine";
import {
  BaseTemplate,
  DirectoryTemplate,
  FileTemplate
} from "../../infrastructure/templates/zod";
import { Config } from "../../utils/config";

interface IContentRenderer {
  renderFile: (file: NodeFile) => string;
  renderDirectory: (directory: NodeDirectory) => string;
}

interface IDocumentRenderer {
  render: (rootDirectory: NodeDirectory) => string;
  dispose: () => void;
}

export interface IRenderStrategy extends IContentRenderer, IDocumentRenderer {
  getName: () => string;
}

export abstract class RenderBaseStrategy implements IRenderStrategy {
  protected templatePage: Template;
  protected templateDirectory: Template;
  protected templateFile: Template;

  protected constructor(
    private readonly config: Config,
    public readonly name: string,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    this.templatePage = templatePage;
    this.templateDirectory = templateDirectory;
    this.templateFile = templateFile;
  }

  public getName(): string {
    return this.name;
  }

  public renderFile(file: NodeFile): string {
    return this.templateFile.render({
      FILE_NAME: file.name,
      FILE_EXTENSION: file.extension,
      FILE_SIZE: file.size,
      FILE_DEPTH: file.deep,
      FILE_LINES: 0,
      FILE_PATH: file.path,
      FILE_CONTENTS: file.content || ""
    } as FileTemplate & Record<string, string>);
  }

  public renderDirectory(directory: NodeDirectory): string {
    const content = this.renderChildren(directory.children);

    return this.templateDirectory.render({
      DIRECTORY_NAME: directory.name,
      DIRECTORY_PATH: directory.path,
      DIRECTORY_SIZE: directory.size,
      DIRECTORY_LENGTH: directory.length,
      DIRECTORY_DEEP_LENGTH: directory.deepLength,
      DIRECTORY_DEPTH: directory.deep,
      DIRECTORY_CONTENT: content
    } as DirectoryTemplate & Record<string, string>);
  }

  public render(rootDirectory: NodeDirectory | NodeFile): string {
    const rootContent = this.renderNode(rootDirectory);

    return this.templatePage.render({
      PROJECT_NAME:
        this.config.get("projectName") || rootDirectory.name || "Project",
      GENERATION_DATE: new Date().toLocaleDateString(),
      DIRECTORY_STRUCTURE: rootContent,
      TOTAL_SIZE: rootDirectory.size,
      CONTENT: rootContent
    } as BaseTemplate & Record<string, string>);
  }

  public dispose(): void {
    this.templatePage.dispose();
    this.templateDirectory.dispose();
    this.templateFile.dispose();
  }

  protected renderNode(node: NodeFile | NodeDirectory): string {
    return node.type === "file"
      ? this.renderFile(node)
      : this.renderDirectory(node);
  }

  protected renderChildren(children: (NodeFile | NodeDirectory)[]): string {
    if (!children) return "";
    return children.map(child => this.renderNode(child)).join("");
  }
}
