import { BaseRenderStrategy } from "../RenderStrategy";
import { Config } from "../../../utils/config";
import { NodeFile } from "../../../core/entities/NodeFile";
import { OUTPUT_FORMATS } from "../../../utils/config/shema";

export class HTMLRenderStrategy extends BaseRenderStrategy {
  constructor(config: Config) {
    super(config, OUTPUT_FORMATS.html);
  }

  protected processCodeBlock(content: string, language: string): string {
    return `<pre><code class="language-${language}">${this.escapeHtml(
      content
    )}</code></pre>`;
  }

  private escapeHtml(content: string): string {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  public override renderFile(file: NodeFile): string {
    const rendered = super.renderFile(file);
    return this.processCodeBlock(rendered, file.extension.replace(".", ""));
  }
}
