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
import {
  JobConfig,
  OutputFormat,
  OutputFormatExtension
} from "../../utils/config";

export class RenderStrategyBuilder {
  private config: JobConfig | null = null;
  private extension: OutputFormatExtension | null = null;
  private name: OutputFormat | null = null;
  private templatePage: Template | null = null;
  private templateDirectory: Template | null = null;
  private templateFile: Template | null = null;

  /**
   * @param config - The configuration to use for the strategy.
   * @returns The builder instance.
   */
  public setConfig(config: JobConfig): RenderStrategyBuilder {
    this.config = config;
    return this;
  }

  /**
   * @param extension - The extension to use for the strategy.
   * @returns The builder instance.
   */
  public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
    this.extension = extension;
    return this;
  }

  /**
   * @param name - The name to use for the strategy.
   * @returns The builder instance.
   */
  public setName(name: OutputFormat): RenderStrategyBuilder {
    this.name = name;
    return this;
  }

  /**
   * @returns The builder instance.
   */
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

  /**
   * @returns The built strategy.
   */
  public build(): RenderBaseStrategy {
    this.validate();

    const concreteRenderStrategy = this.getRenderStrategy();

    return new concreteRenderStrategy(
      this.config as JobConfig,
      this.templatePage as Template,
      this.templateDirectory as Template,
      this.templateFile as Template
    );
  }

  /**
   * @returns The render strategy.
   */
  private getRenderStrategy():
    | typeof RenderMarkdownStrategy
    | typeof RenderHTMLStrategy {
    switch (this.name) {
      case "markdown":
        return RenderMarkdownStrategy;
      case "html":
        return RenderHTMLStrategy;
      default:
        throw new Error(`Unsupported output format: ${this.name}`);
    }
  }

  /**
   * @returns Whether the builder is valid.
   */
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

  /**
   * @param templateDir - The directory to load the template from.
   * @returns The loaded template.
   */
  private loadTemplateFile(templateDir: string): Promise<Template> {
    return Template.create(
      "file",
      fileTemplateSchema,
      documentFactory.join(templateDir, `file.${this.extension}`)
    );
  }

  /**
   * @param templateDir - The directory to load the template from.
   * @returns The loaded template.
   */
  private loadTemplateDirectory(templateDir: string): Promise<Template> {
    return Template.create(
      "directory",
      directoryTemplateSchema,
      documentFactory.join(templateDir, `directory.${this.extension}`)
    );
  }

  /**
   * @param templateDir - The directory to load the template from.
   * @returns The loaded template.
   */
  private loadTemplatePage(templateDir: string): Promise<Template> {
    return Template.create(
      "page",
      baseTemplateSchema,
      documentFactory.join(templateDir, `page.${this.extension}`)
    );
  }
}
