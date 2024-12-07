import { RenderBaseStrategy } from "./RenderStrategy";
import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
import { Config } from "../../utils/config";
import { OutputFormat } from "../../utils/config/schema";

// Factory function for common render strategies
export const renderStrategyFactory = {
  async createMarkdownStrategy(config: Config): Promise<RenderBaseStrategy> {
    return await new RenderStrategyBuilder()
      .setConfig(config)
      .setExtension("md")
      .setName("Markdown")
      .loadTemplates()
      .then(builder => builder.build());
  },

  async createHTMLStrategy(config: Config): Promise<RenderBaseStrategy> {
    return await new RenderStrategyBuilder()
      .setConfig(config)
      .setExtension("html")
      .setName("HTML")
      .loadTemplates()
      .then(builder => builder.build());
  },

  async createStrategies(
    config: Config,
    formats: OutputFormat[]
  ): Promise<RenderBaseStrategy[]> {
    return await Promise.all(
      formats.map(format => this.createStrategy(config, format))
    );
  },

  async createStrategy(
    config: Config,
    format: OutputFormat
  ): Promise<RenderBaseStrategy> {
    switch (format) {
      case "markdown":
        return await this.createMarkdownStrategy(config);
      case "html":
        return await this.createHTMLStrategy(config);
    }
  }
};
