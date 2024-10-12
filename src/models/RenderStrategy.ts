import { File } from "./File";
import { Directory } from "./Directory";
import { Config } from "../utils/Config";
import * as fs from "fs/promises";
import * as path from "path";

export interface RenderStrategy {
  loadTemplates(): Promise<void>;
  renderFile(file: File): string;
  renderDirectory(directory: Directory): string;
  generateOutput(rootDirectory: Directory): Promise<string>;
}

export abstract class BaseRenderStrategy implements RenderStrategy {
  protected templatePage: string = "";
  protected templateFile: string = "";
  protected templateDirectory: string = "";
  protected config: Config;
  protected abstract fileExtension: string;

  constructor(config: Config) {
    this.config = config;
  }

  async loadTemplates(): Promise<void> {
    const templateDir = path.join(
      this.config.get("rootDir") as string,
      "templates"
    );
    this.templatePage = await fs.readFile(
      path.join(templateDir, `page.${this.fileExtension}`),
      "utf-8"
    );
    this.templateFile = await fs.readFile(
      path.join(templateDir, `file.${this.fileExtension}`),
      "utf-8"
    );
    this.templateDirectory = await fs.readFile(
      path.join(templateDir, `directory.${this.fileExtension}`),
      "utf-8"
    );
  }

  public renderFile(file: File): string {
    return this.replaceSelectors(this.templateFile, {
      ...file.props,
      CONTENT: file.children || "",
    });
  }

  renderDirectory(directory: Directory): string {
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

  async generateOutput(rootDirectory: Directory): Promise<string> {
    const directoryContent = this.renderDirectory(rootDirectory);
    return this.replaceSelectors(this.templatePage, {
      CONTENT: directoryContent,
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
}
