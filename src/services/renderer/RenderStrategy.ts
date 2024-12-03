import { NodeDirectory } from "../../core/entities/NodeDirectory";
import { NodeFile } from "../../core/entities/NodeFile";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { Template } from "../../infrastructure/templates/TemplateEngine";
import {
  BaseTemplate,
  DirectoryTemplate,
  FileTemplate,
  baseTemplateSchema,
  directoryTemplateSchema,
  fileTemplateSchema
} from "../../infrastructure/templates/zod";
import { TemplateType } from "../../types/template";
import { Config, OutputFormatExtension } from "../../utils/config";

interface IContentRenderer {
  renderFile: (file: NodeFile) => string;
  renderDirectory: (directory: NodeDirectory) => string;
}

interface ITemplateLoader {
  loadTemplates: () => Promise<void>;
}

interface IDocumentRenderer {
  render: (rootDirectory: NodeDirectory) => string;
  dispose: () => void;
}

export interface IRenderStrategy
  extends IContentRenderer,
    ITemplateLoader,
    IDocumentRenderer {}

export abstract class BaseRenderStrategy implements IRenderStrategy {
  protected extension: OutputFormatExtension;
  protected templates: Record<TemplateType, Template | null>;
  protected config: Config;

  protected constructor(config: Config, extension: OutputFormatExtension) {
    this.config = config;
    this.templates = {
      page: null,
      file: null,
      directory: null
    };
    this.extension = extension;
  }

  public async loadTemplates(): Promise<void> {
    const templateDir = Template.getTemplateDir(this.config);
    this.templates = {
      page: await Template.create(
        "page",
        baseTemplateSchema,
        documentFactory.join(templateDir, `page.${this.extension}`)
      ),
      file: await Template.create(
        "file",
        fileTemplateSchema,
        documentFactory.join(templateDir, `file.${this.extension}`)
      ),
      directory: await Template.create(
        "directory",
        directoryTemplateSchema,
        documentFactory.join(templateDir, `directory.${this.extension}`)
      )
    };
  }

  public renderFile(file: NodeFile): string {
    if (!this.templates.file) {
      throw new Error("File template is not loaded");
    }
    return this.replaceSelectors(this.templates.file.content, {
      FILE_NAME: file.name,
      FILE_EXTENSION: file.extension,
      FILE_SIZE: file.size,
      FILE_CONTENTS: file.content || "",
      ...file.props
    });
  }

  public renderDirectory(directory: NodeDirectory): string {
    const content = directory.children
      .map(
        child =>
          child instanceof NodeFile
            ? this.renderFile(child)
            : this.renderDirectory(child) // save the rendering result on the object after bundling execution
      )
      .join("");
    if (!this.templates.directory) {
      throw new Error("Directory template is not loaded");
    }
    return this.replaceSelectors(this.templates.directory.content, {
      DIRECTORY_NAME: directory.name,
      DIRECTORY_PATH: directory.path,
      DIRECTORY_SIZE: directory.size,
      DIRECTORY_CONTENT: content,
      ...directory.props
    });
  }

  public render(rootDirectory: NodeDirectory): string {
    const directoryContent = this.renderDirectory(rootDirectory);
    if (!this.templates.page) {
      throw new Error("Page template is not loaded");
    }
    return this.replaceSelectors(this.templates.page.content, {
      PROJECT_NAME:
        this.config.get("projectName") || rootDirectory.name || "Project",
      GENERATION_DATE: new Date().toLocaleDateString(),
      DIRECTORY_STRUCTURE: directoryContent,
      TOTAL_FILES: rootDirectory.length,
      TOTAL_DIRECTORIES: rootDirectory.deepLength,
      TOTAL_SIZE: rootDirectory.size,
      CONTENT: directoryContent
    });
  }

  public dispose(): void {
    this.templates = {
      page: null,
      file: null,
      directory: null
    };
  }

  protected replaceSelectors(
    template: string,
    values: BaseTemplate | FileTemplate | DirectoryTemplate
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const typedKey = key as keyof typeof values;
      return values[typedKey] !== undefined
        ? String(values[typedKey])
        : `{{${key}}}`;
    });
  }
}
