import fs from 'fs/promises';
import path from 'path';
import { Config } from "../Config";

export class MarkdownGenerator {
  private config: Config;
  private markdownTemplatePath: {
    page: string;
    directory: string;
    file: string;
  };
  private markdownTemplate: {
    page: string;
    directory: string;
    file: string;
  } = {
    page: "",
    directory: "",
    file: "",
  };

  private constructor(config: Config) {
    this.config = config;
    this.markdownTemplatePath = this.getMarkdownTemplatePath();
  }

  public static async init(config: Config): Promise<MarkdownGenerator> {
    const markdownGenerator = new MarkdownGenerator(config);
    await markdownGenerator.init();
    return markdownGenerator;
  }

  private async init(): Promise<void> {
    this.markdownTemplate = await this.getTemplateMarkdown();
  }

  private getMarkdownTemplatePath(): {
    page: string;
    directory: string;
    file: string;
  } {
    return {
      page: path.join(__dirname, "../../../templates/default_template_page.md"),
      directory: path.join(__dirname, "../../../templates/default_template_directory.md"),
      file: path.join(__dirname, "../../../templates/default_template_file.md"),
    };
  }

  public async getTemplateMarkdown(): Promise<{
    page: string;
    directory: string;
    file: string;
  }> {
    const [page, directory, file] = await Promise.all([
      fs.readFile(this.markdownTemplatePath.page, "utf8"),
      fs.readFile(this.markdownTemplatePath.directory, "utf8"),
      fs.readFile(this.markdownTemplatePath.file, "utf8"),
    ]);
    return {
      page,
      directory,
      file,
    };
  }
}
