import { NodeDirectory } from "../../core/entities/NodeDirectory";
import { NodeFile } from "../../core/entities/NodeFile";
import { Template } from "../../infrastructure/templates/TemplateEngine";
import {
  BaseTemplate,
  DirectoryTemplate,
  FileTemplate
} from "../../infrastructure/templates/zod";
import { JobConfig, OutputFormat } from "../../utils/config";

interface IContentRenderer {
  renderFile: (file: NodeFile) => string;
  renderDirectory: (directory: NodeDirectory) => string;
}

interface IDocumentRenderer {
  render: (rootDirectory: NodeDirectory) => string;
  dispose: () => void;
}

export interface IRenderStrategy extends IContentRenderer, IDocumentRenderer {
  getName: () => OutputFormat;
}

export abstract class RenderBaseStrategy implements IRenderStrategy {
  protected templatePage: Template;
  protected templateDirectory: Template;
  protected templateFile: Template;

  protected constructor(
    private readonly config: JobConfig,
    public readonly name: OutputFormat,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    this.templatePage = templatePage;
    this.templateDirectory = templateDirectory;
    this.templateFile = templateFile;
  }

  public getName(): OutputFormat {
    return this.name;
  }

  public renderFile(file: NodeFile): string {
    return this.templateFile.render({
      FILE_NAME: file.name,
      FILE_EXTENSION: file.extension.replace(".", ""),
      FILE_SIZE: file.size,
      FILE_DEPTH: file.deep,
      FILE_LINES: file.content?.split("\n").length || 0,
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
      DIRECTORY_NUMBER_OF_FILES: directory.numberOfFiles,
      DIRECTORY_DEEP_LENGTH: directory.deepLength,
      DIRECTORY_DEPTH: directory.deep,
      DIRECTORY_CONTENT: content
    } as DirectoryTemplate & Record<string, string>);
  }

  public render(rootDirectory: NodeDirectory | NodeFile): string {
    const rootContent = this.renderNode(rootDirectory);

    const templateConfig = {
      PROJECT_NAME: this.getProjectName(rootDirectory.name),
      GENERATION_DATE: new Date().toISOString(),
      TOTAL_SIZE: rootDirectory.size,
      CONTENT: rootContent
    } as BaseTemplate & Record<string, string>;

    if (rootDirectory.type === "directory") {
      templateConfig["TOTAL_FILES"] = rootDirectory.length;
      templateConfig["TOTAL_DIRECTORIES"] = rootDirectory.deepLength;
    }

    return this.templatePage.render(templateConfig);
  }

  public dispose(): void {
    this.templatePage.dispose();
    this.templateDirectory.dispose();
    this.templateFile.dispose();
  }

  protected getProjectName(otherName?: string): string {
    return this.config.global.get("projectName") || otherName || "Project";
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
