import { ZodObject, z } from "zod";

import { TemplateType } from "../../types/template";
import { logger } from "../../utils/logger";
import { documentFactory } from "../filesystem/DocumentFactory";

type TemplateValue = z.ZodType<string | number | boolean | undefined>;

export class Template<
  T extends Record<string, TemplateValue> = Record<string, TemplateValue>
> {
  private _content: string = "";
  private schema: ZodObject<T>;

  public constructor(
    private type: TemplateType,
    schema: ZodObject<T>
  ) {
    // convert all fields to optional
    const optionalFields = Object.fromEntries(
      Object.entries(schema.shape).map(([key, value]) => [
        key,
        value.optional()
      ])
    );
    this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
  }

  public async load(
    path: string,
    additionalFields?: Record<string, z.ZodSchema<string>>
  ): Promise<void> {
    this._content = await documentFactory.readFile(path);
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

  public render(data: Record<string, string | number | boolean>): string {
    try {
      this.schema.parse(data);
      const contentTokens = this.getTemplateTokens();
      const missingTokens = contentTokens.filter(token => {
        // Check if the token is required and not provided in values
        const isRequired = this.schema.shape[token]?.isOptional() === false;
        return isRequired && !(token in data);
      });

      if (missingTokens.length > 0) {
        throw new Error(
          `Missing required values for tokens: ${missingTokens.join(", ")}`
        );
      }

      const templateContent = this.content;
      return templateContent.replace(
        new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g"),
        (_, key) => (key in data ? String(data[key]) : `{{${key}}}`)
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Template content validation failed for ${this.type}: ${error.errors
            .map(e => `${e.path.join(".")}: ${e.message}`)
            .join(", ")}`
        );
      }
      throw error;
    }
  }

  private getTemplateTokens(): string[] {
    const tokenRegex = /\{\{(\w+)\}\}/g;
    const tokens: string[] = [];
    let match;

    while ((match = tokenRegex.exec(this.content)) !== null) {
      const token = match[1];
      if (token === undefined) {
        throw new Error(`Invalid template content for ${this.type}`);
      }
      tokens.push(token);
    }

    return tokens;
  }

  private validate(): void {
    const tokens = this.getTemplateTokens();
    const requiredFields = Object.keys(this.schema.shape);
    const missingRequired = requiredFields.filter(
      field => !tokens.includes(field)
    );

    if (missingRequired.length > 0) {
      logger.warn(
        `Missing required tokens in ${this.type} template: ${missingRequired.join(
          ", "
        )}`
      );
    }
  }
}
