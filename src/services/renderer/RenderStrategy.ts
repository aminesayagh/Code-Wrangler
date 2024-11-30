import { NodeFile } from "../../core/entities/NodeFile";
import { NodeDirectory } from "../../core/entities/NodeDIrectory";
import { Config, OutputFormatExtension } from "../../utils/config";
import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { Template } from "../../infrastructure/templates/TemplateEngine";
import {
  BaseTemplateSchema,
  FileTemplateSchema,
  DirectoryTemplateSchema,
  BaseTemplate,
  FileTemplate,
  DirectoryTemplate,
} from "../../infrastructure/templates/zod";
import { TemplateType } from "../../types/template";

interface ContentRenderer {
  renderFile(file: NodeFile): string;
  renderDirectory(directory: NodeDirectory): string;
}

interface TemplateLoader {
  loadTemplates(): Promise<void>;
}

interface DocumentRenderer {
  render(rootDirectory: NodeDirectory): Promise<string>;
  dispose(): Promise<void>;
}

export interface RenderStrategy
  extends ContentRenderer,
    TemplateLoader,
    DocumentRenderer {}

export abstract class BaseRenderStrategy implements RenderStrategy {
  protected extension: OutputFormatExtension;
  protected templates: Record<TemplateType, Template | null>;
  protected config: Config;

  protected constructor(config: Config, extension: OutputFormatExtension) {
    this.config = config;
    this.templates = {
      page: null,
      file: null,
      directory: null,
    };
    this.extension = extension;
  }

  async loadTemplates(): Promise<void> {
    const templateDir = DocumentFactory.join(
      this.config.get("rootDir") as string,
      this.config.get("templatesDir") as string
    );
    // check if the templates directory exists
    if (!DocumentFactory.exists(templateDir)) {
      throw new Error(`Templates directory not found: ${templateDir}`);
    }

    this.templates = {
      page: await Template.create(
        "page",
        BaseTemplateSchema,
        DocumentFactory.join(templateDir, `page.${this.extension}`)
      ),
      file: await Template.create(
        "file",
        FileTemplateSchema,
        DocumentFactory.join(templateDir, `file.${this.extension}`)
      ),
      directory: await Template.create(
        "directory",
        DirectoryTemplateSchema,
        DocumentFactory.join(templateDir, `directory.${this.extension}`)
      ),
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
    });
  }

  public renderDirectory(directory: NodeDirectory): string {
    const content = directory.children
      .map(
        (child) =>
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
      CONTENT: content,
    });
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

  public async render(rootDirectory: NodeDirectory): Promise<string> {
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
      CONTENT: directoryContent,
    });
  }

  public async dispose(): Promise<void> {
    this.templates = {
      page: null,
      file: null,
      directory: null,
    };
  }
}
