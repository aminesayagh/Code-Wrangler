export interface TemplateSchema {
  required: string[];
  optional?: string[];
}

export class TemplateValidator {
  static validate(template: string, validator: TemplateSchema): void {
    const missingTokens = validator.required.filter(
      (token) => !template.includes(`{{${token}}}`)
    );
    if (missingTokens.length > 0) {
      throw new Error(`Missing required tokens: ${missingTokens.join(", ")}`);
    }
  }
}
