import { BaseRenderStrategy } from "../RenderStrategy";
import { Config } from "../../../utils/config";
import { OUTPUT_FORMATS } from "../../../utils/config/schema";
import { NodeFile } from "../../../core/entities/NodeFile";

export class MarkdownStrategy extends BaseRenderStrategy {
  constructor(config: Config) {
    super(config, OUTPUT_FORMATS.markdown);
  }

  protected processCodeBlock(content: string, language: string): string {
    return `\`\`\`${language}\n${content}\n\`\`\``;
  }

  public override renderFile(file: NodeFile): string {
    const rendered = super.renderFile(file);
    return this.processCodeBlock(rendered, file.extension.replace(".", ""));
  }
}
