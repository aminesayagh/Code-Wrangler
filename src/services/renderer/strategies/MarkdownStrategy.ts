import { NodeFile } from "../../../core/entities/NodeFile";
import { Config } from "../../../utils/config";
import { OUTPUT_FORMATS } from "../../../utils/config/schema";
import { BaseRenderStrategy } from "../RenderStrategy";

export class MarkdownStrategy extends BaseRenderStrategy {
  constructor(config: Config) {
    super(config, OUTPUT_FORMATS.markdown);
  }

  public override renderFile(file: NodeFile): string {
    const rendered = super.renderFile(file);
    return this.processCodeBlock(rendered, file.extension.replace(".", ""));
  }

  protected processCodeBlock(content: string, language: string): string {
    return `\`\`\`${language}\n${content}\n\`\`\``;
  }
}
