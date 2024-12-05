import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { RenderBaseStrategy } from "../RenderStrategy";

export class RenderHTMLStrategy extends RenderBaseStrategy {
  public constructor(
    config: Config,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    super(config, "html", templatePage, templateDirectory, templateFile);
  }
}
