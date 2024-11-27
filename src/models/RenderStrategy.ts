import * as path from "path";

import { File } from "./File";
import { Directory } from "./Directory";
import { Config, FileExtension } from "../utils/Config";
import { DocumentFactory } from "../utils/DocumentFactory";
import { Template } from "./template/Template";
import { TemplateType } from "./template/type";
import {
  BaseTemplateSchema,
  FileTemplateSchema,
  DirectoryTemplateSchema,
} from "./template/zod";

interface ContentRenderer {
  renderFile(file: File): string;
  renderDirectory(directory: Directory): string;
}

interface TemplateLoader {
  loadTemplates(): Promise<void>;
}

interface DocumentRenderer {
  render(rootDirectory: Directory): Promise<string>;
  dispose(): Promise<void>;
}

export interface RenderStrategy
  extends ContentRenderer,
    TemplateLoader,
    DocumentRenderer {}

export abstract class BaseRenderStrategy implements RenderStrategy {
  protected extension: FileExtension;
  protected templates: Record<TemplateType, Template | null>;
  protected config: Config;

  protected constructor(config: Config, extension: FileExtension) {
    this.config = config;
    this.templates = {
      page: null,
      file: null,
      directory: null,
    };
    this.extension = extension;
  }

  async loadTemplates(): Promise<void> {
    const templateDir = path.join(
      this.config.get("rootDir") as string,
      "templates"
    );
    // check if the templates directory exists
    if (!DocumentFactory.exists(templateDir)) {
      throw new Error(`Templates directory not found: ${templateDir}`);
    }

    this.templates = {
      page: await Template.create(
        "page",
        BaseTemplateSchema,
        path.join(templateDir, `page.${this.extension}`)
      ),
      file: await Template.create(
        "file",
        FileTemplateSchema,
        path.join(templateDir, `file.${this.extension}`)
      ),
      directory: await Template.create(
        "directory",
        DirectoryTemplateSchema,
        path.join(templateDir, `directory.${this.extension}`)
      ),
    };
  }

  public renderFile(file: File): string {
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

  public renderDirectory(directory: Directory): string {
    const content = directory.children
      .map(
        (child) =>
          child instanceof File
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
    values: Record<string, string | number>
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
      values[key] !== undefined ? String(values[key]) : `{{${key}}}`
    );
  }

  public async render(rootDirectory: Directory): Promise<string> {
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
