import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { JobConfig } from "../../../utils/config";
import { RenderBaseStrategy } from "../RenderStrategy";

export class RenderHTMLStrategy extends RenderBaseStrategy {
  public constructor(
    config: JobConfig,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    super(config, "html", templatePage, templateDirectory, templateFile);
  }
}
