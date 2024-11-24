import * as path from "path";

import { File } from "./File";
import { Directory } from "./Directory";
import { TemplateValidator } from "./TemplateValidator";
import { Config } from "../utils/Config";
import { DocumentFactory } from "../utils/DocumentFactory";

interface ContentRenderer {
  renderFile(file: File): string;
  renderDirectory(directory: Directory): string;
}

interface TemplateLoader {
  loadTemplates(): Promise<void>;
  validateTemplates(): void;
}

interface DocumentBundler {
  bundle(rootDirectory: Directory): Promise<string>;
  dispose(): Promise<void>;
}

export interface RenderStrategy
  extends ContentRenderer,
    TemplateLoader,
    DocumentBundler {}

export abstract class BaseRenderStrategy implements RenderStrategy {
  protected templatePage: string = "";
  protected templateFile: string = "";
  protected templateDirectory: string = "";
  protected config: Config;
  protected abstract fileExtension: string;

  protected constructor(config: Config) {
    this.config = config;
  }

  async loadTemplates(): Promise<void> {
    const templateDir = path.join(
      this.config.get("rootDir") as string,
      "templates"
    );
    // check if the templates directory exists
    if (!(await DocumentFactory.exists(templateDir))) {
      throw new Error(`Templates directory not found: ${templateDir}`);
    }
    [this.templatePage, this.templateFile, this.templateDirectory] =
      await Promise.all([
        DocumentFactory.readFile(
          path.join(templateDir, `page.${this.fileExtension}`)
        ),
        DocumentFactory.readFile(
          path.join(templateDir, `file.${this.fileExtension}`)
        ),
        DocumentFactory.readFile(
          path.join(templateDir, `directory.${this.fileExtension}`)
        ),
      ]);
  }

  public validateTemplates(): void {
    TemplateValidator.validate(this.templatePage, {
      required: [
        "{{PROJECT_NAME}}",
        "{{GENERATION_DATE}}",
        "{{DIRECTORY_STRUCTURE}}",
        "{{TOTAL_FILES}}",
        "{{TOTAL_DIRECTORIES}}",
        "{{TOTAL_SIZE}}",
        "{{CONTENT}}",
      ],
      optional: ["{{FILE_CONTENTS}}"],
    });
    TemplateValidator.validate(this.templateFile, {
      required: [
        "{{FILE_NAME}}",
        "{{FILE_EXTENSION}}",
        "{{FILE_SIZE}}",
        "{{FILE_CONTENTS}}",
      ],
    });
    TemplateValidator.validate(this.templateDirectory, {
      required: [
        "{{DIRECTORY_NAME}}",
        "{{DIRECTORY_PATH}}",
        "{{DIRECTORY_SIZE}}",
        "{{CONTENT}}",
      ],
    });
  }

  public renderFile(file: File): string {
    return this.replaceSelectors(this.templateFile, {
      ...file.props,
      CONTENT: file.children || "",
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
    return this.replaceSelectors(this.templateDirectory, {
      ...directory.props,
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

  public async bundle(rootDirectory: Directory): Promise<string> {
    const directoryContent = this.renderDirectory(rootDirectory);
    return this.replaceSelectors(this.templatePage, {
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
    this.templatePage = "";
    this.templateFile = "";
    this.templateDirectory = "";
  }
}
