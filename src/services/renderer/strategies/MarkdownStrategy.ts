import { NodeFile } from "../../../core/entities/NodeFile";
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { OUTPUT_FORMATS } from "../../../utils/config/schema";
import { RenderBaseStrategy } from "../RenderStrategy";

export class RenderMarkdownStrategy extends RenderBaseStrategy {
  public constructor(
    config: Config,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    super(
      config,
      OUTPUT_FORMATS.markdown,
      templatePage,
      templateDirectory,
      templateFile
    );
  }

  public override renderFile(file: NodeFile): string {
    const rendered = super.renderFile(file);
    return this.processCodeBlock(rendered, file.extension.replace(".", ""));
  }

  protected processCodeBlock(content: string, language: string): string {
    return `\`\`\`${language}\n${content}\n\`\`\``;
  }
}
