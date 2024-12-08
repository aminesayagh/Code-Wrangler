import { RenderBaseStrategy } from "./RenderStrategy";
import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
import { JobConfig } from "../../utils/config";
import { OutputFormat } from "../../utils/config/schema";

// Factory function for common render strategies
export const renderStrategyFactory = {
  cache: new Map<string, RenderBaseStrategy>(),

  async createMarkdownStrategy(config: JobConfig): Promise<RenderBaseStrategy> {
    return await new RenderStrategyBuilder()
      .setConfig(config)
      .setExtension("md")
      .setName("markdown")
      .loadTemplates()
      .then(builder => builder.build());
  },

  async createHTMLStrategy(config: JobConfig): Promise<RenderBaseStrategy> {
    return await new RenderStrategyBuilder()
      .setConfig(config)
      .setExtension("html")
      .setName("html")
      .loadTemplates()
      .then(builder => builder.build());
  },

  async createStrategies(
    config: JobConfig,
    formats: OutputFormat[]
  ): Promise<RenderBaseStrategy[]> {
    return await Promise.all(
      formats.map(format => this.createStrategy(config, format))
    );
  },

  /**
   * Creates a strategy for the given config and format.
   * @param config - The job config.
   * @param format - The output format.
   * @returns The strategy.
   */
  async createStrategy(
    config: JobConfig,
    format: OutputFormat
  ): Promise<RenderBaseStrategy> {
    const key = `${config.get("name")}-${format}`;
    if (this.cache.has(key)) return this.cache.get(key) as RenderBaseStrategy;

    let strategy: RenderBaseStrategy;
    if (format === "markdown") {
      strategy = await this.createMarkdownStrategy(config);
    } else if (format === "html") {
      strategy = await this.createHTMLStrategy(config);
    } else {
      throw new Error(`Unknown format: ${format}`);
    }

    this.cache.set(key, strategy);
    return strategy;
  }
};
