import { RenderBaseStrategy } from "./RenderStrategy";
import { RenderHTMLStrategy } from "./strategies/HTMLStrategy";
import { RenderMarkdownStrategy } from "./strategies/MarkdownStrategy";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { Template } from "../../infrastructure/templates/TemplateEngine";
import {
  baseTemplateSchema,
  directoryTemplateSchema,
  fileTemplateSchema
} from "../../infrastructure/templates/zod";
import { Config, OutputFormatExtension } from "../../utils/config";

export class RenderStrategyBuilder {
  private config: Config | null = null;
  private extension: OutputFormatExtension | null = null;
  private name: string | null = null;
  private templatePage: Template | null = null;
  private templateDirectory: Template | null = null;
  private templateFile: Template | null = null;

  public setConfig(config: Config): RenderStrategyBuilder {
    this.config = config;
    return this;
  }

  public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
    this.extension = extension;
    return this;
  }

  public setName(name: string): RenderStrategyBuilder {
    this.name = name;
    return this;
  }

  public async loadTemplates(): Promise<RenderStrategyBuilder> {
    if (!this.config) {
      throw new Error("Config is required");
    }

    const templateDir = Template.getTemplateDir(this.config);

    this.templatePage = await this.loadTemplatePage(templateDir);
    this.templateDirectory = await this.loadTemplateDirectory(templateDir);
    this.templateFile = await this.loadTemplateFile(templateDir);

    return this;
  }

  public build(): RenderBaseStrategy {
    this.validate();

    const concreteRenderStrategy =
      this.name === "Markdown" ? RenderMarkdownStrategy : RenderHTMLStrategy;

    return new concreteRenderStrategy(
      this.config as Config,
      this.templatePage as Template,
      this.templateDirectory as Template,
      this.templateFile as Template
    );
  }

  private validate(): boolean {
    if (!this.config) {
      throw new Error("Config is required");
    }
    if (!this.extension) {
      throw new Error("Extension is required");
    }
    if (!this.name) {
      throw new Error("Name is required");
    }
    if (!this.templatePage || !this.templateDirectory || !this.templateFile) {
      throw new Error("Templates must be loaded before building");
    }

    return true;
  }

  private loadTemplateFile(templateDir: string): Promise<Template> {
    return Template.create(
      "file",
      fileTemplateSchema,
      documentFactory.join(templateDir, `file.${this.extension}`)
    );
  }

  private loadTemplateDirectory(templateDir: string): Promise<Template> {
    return Template.create(
      "directory",
      directoryTemplateSchema,
      documentFactory.join(templateDir, `directory.${this.extension}`)
    );
  }

  private loadTemplatePage(templateDir: string): Promise<Template> {
    return Template.create(
      "page",
      baseTemplateSchema,
      documentFactory.join(templateDir, `page.${this.extension}`)
    );
  }
}
