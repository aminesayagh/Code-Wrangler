import { Config } from "../Config";
import { logger } from "../Logger";
import { MarkdownGenerator } from "./MarkdownGenerator";
import fs from "fs/promises";

export abstract class OutputFileGenerator {
  public abstract readonly name: string;
  public abstract readonly extension: string;
  protected constructor() {}
  abstract updateSection(sectionName: string, content: string): void;
  abstract generateOutput(): string;
}

export class TemplateEngine {
  private templates: OutputFileGenerator[] = [];
  private config: Config;
  private constructor(config: Config) {
    this.config = config;
  }

  public static async init(config: Config): Promise<TemplateEngine> {
    const templateEngine = new TemplateEngine(config);
    await templateEngine.loadTemplates();
    return templateEngine;
  }
  private async loadTemplates(): Promise<void> {
    const outputFormats = this.config.get("outputFormat");
    if (Array.isArray(outputFormats)) {
      const templatePromises = outputFormats.map((format) => {
        switch (format) {
          case "markdown":
            return MarkdownGenerator.init();
          default:
            logger.warn(`Unsupported output format: ${format}`);
            return null;
        }
      });

      const loadedTemplates = await Promise.all(templatePromises);
      this.templates = loadedTemplates.filter(
        (template): template is MarkdownGenerator => template !== null
      ) as OutputFileGenerator[];
    }
  }

  public updateSection(sectionName: string, content: string): void {
    this.templates.forEach((template) =>
      template.updateSection(sectionName, content)
    );
  }

  public async generateOutput(): Promise<boolean> {
    const templates = this.templates.map((template) => ({
      content: template.generateOutput(),
      name: template.name,
      extension: template.extension,
    }));
    await Promise.all(
      templates.map((template) => {
        const outputFile =
          (this.config.get("outputFile") as string) + "." + template.extension;
        return fs.writeFile(outputFile, template.content);
      })
    );
    return true;
  }
}
