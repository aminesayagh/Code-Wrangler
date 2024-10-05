import fs from "fs/promises";
import path from "path";
import { logger } from "../Logger";
import { MarkdownParser } from "./MarkdownParser";

export class MarkdownGenerator {
  public readonly name = "markdown";
  public readonly extension = "md";
  private templatePath: string;
  private parser: MarkdownParser | null = null;

  protected constructor() {
    this.templatePath = this.getTemplatePath();
  }

  public static async init(): Promise<MarkdownGenerator> {
    const markdownGenerator = new MarkdownGenerator();
    await markdownGenerator.loadTemplate();
    return markdownGenerator;
  }

  protected getTemplatePath(): string {
    return path.join(
      __dirname,
      "..",
      "src",
      "templates",
      "default-template.md"
    );
  }

  protected async loadTemplate(): Promise<void> {
    try {
      const template = await fs.readFile(this.templatePath, "utf8");
      this.parser = await MarkdownParser.init(template);
    } catch (error) {
      logger.error(`Error loading template: ${error}`);
      throw error;
    }
  }

  public async updateSection(sectionName: string, content: string): Promise<void> {
    if (!this.parser) {
      throw new Error("Template not loaded");
    }
    await this.parser.updateSection(sectionName, content);
  }

  public generateOutput(): string {
    if (!this.parser) {
      throw new Error("Template not loaded");
    }
    return this.parser.toString();
  }
}
