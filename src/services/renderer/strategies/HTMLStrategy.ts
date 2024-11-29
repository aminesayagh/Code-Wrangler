import { BaseRenderStrategy } from "../RenderStrategy";
import { Config } from "../../../utils/config";
import { OUTPUT_FORMATS } from "../../../utils/config/shema";

export class HTMLRenderStrategy extends BaseRenderStrategy {
  constructor(config: Config) {
    super(config, OUTPUT_FORMATS.html);
  }

  protected async processCodeBlock(
    content: string,
    language: string
  ): Promise<string> {
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

  public override renderFile(file: File): string {
    const rendered = super.renderFile(file);
    return this.processCodeBlock(rendered, file.extension.replace(".", ""));
  }
}
