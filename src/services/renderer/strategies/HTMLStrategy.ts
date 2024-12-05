import { NodeFile } from "../../../core/entities/NodeFile";
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { OUTPUT_FORMATS } from "../../../utils/config/schema";
import { RenderBaseStrategy } from "../RenderStrategy";

export class RenderHTMLStrategy extends RenderBaseStrategy {
  public constructor(
    config: Config,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    super(
      config,
      OUTPUT_FORMATS.html,
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
}
