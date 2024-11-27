import { z, ZodObject } from "zod";
import { TemplateType } from "./type";

import { DocumentFactory } from "../../utils/DocumentFactory";
import { FILE_EXTENSION, Config, FileExtension } from "../../utils/Config";

type TemplateValue = z.ZodType<string | number | boolean>;

export class Template<
  T extends Record<string, TemplateValue> = Record<string, TemplateValue>
> {
  private _content: string = "";

  public constructor(
    private type: TemplateType,
    private schema: ZodObject<T>
  ) {}

  public async load(
    path: string,
    additionalFields?: Record<string, z.ZodSchema<string>>
  ): Promise<void> {
    this._content = await DocumentFactory.readFile(path);
    if (additionalFields) {
      this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
    }
    this.validate();
  }

  public get content(): string {
    if (!this._content) {
      throw new Error(`Template content is not loaded for ${this.type}`);
    }
    return this._content;
  }

  private validate() {
    const tokens = this.getTemplateTokens();
    const requiredFields = Object.keys(this.schema.shape);
    const missingRequired = requiredFields.filter(
      (field) => !tokens.includes(field)
    );

    if (missingRequired.length > 0) {
      throw new Error(
        `Missing required tokens in ${
          this.type
        } template: ${missingRequired.join(", ")}`
      );
    }
  }

  public static async create<T extends Record<string, TemplateValue>>(
    type: TemplateType,
    schema: ZodObject<T>,
    path: string,
    additionalFields?: Record<string, z.ZodSchema<string>>
  ): Promise<Template<T>> {
    const template = new Template(type, schema);
    await template.load(path, additionalFields);
    return template;
  }

  private getTemplateTokens(): string[] {
    const tokenRegex = /\{\{(\w+)\}\}/g;
    const tokens: string[] = [];
    let match;

    while ((match = tokenRegex.exec(this.content)) !== null) {
      tokens.push(match[1]!);
    }

    return tokens;
  }

  public render(values: Record<string, string | number | boolean>): string {
    try {
      this.schema.parse(values);
      return this.content.replace(/\{\{(\w+)\}\}/g, (_, key) =>
        values[key] !== undefined ? String(values[key]) : `{{${key}}}`
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Template content validation failed for ${this.type}: ${error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ")}`
        );
      }
      throw error;
    }
  }

  static get templateFileExtensions(): FileExtension[] {
    const config = Config.load();
    return config.get("outputFormat").map((format) => FILE_EXTENSION[format]);
  }
}
