import { Template } from "../../../infrastructure/templates/TemplateEngine";
import {
  Config,
  JobConfig,
  OutputFormat,
  OutputFormatExtension
} from "../../../utils/config";
import { RenderStrategyBuilder } from "../RenderStrategyBuilder";
import { RenderHTMLStrategy } from "../strategies/HTMLStrategy";
import { RenderMarkdownStrategy } from "../strategies/MarkdownStrategy";

jest.mock("../../../infrastructure/templates/TemplateEngine");
jest.mock("../../../utils/config");
jest.mock("../strategies/HTMLStrategy");
jest.mock("../strategies/MarkdownStrategy");

describe("RenderStrategyBuilder", () => {
  let builder: RenderStrategyBuilder;
  let mockConfig: jest.Mocked<JobConfig>;
  let mockTemplate: jest.Mocked<Template>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      get: jest.fn(),
      global: {} as unknown as Config
    } as unknown as jest.Mocked<JobConfig>;

    mockTemplate = {
      content: "template content"
    } as unknown as jest.Mocked<Template>;

    (Template.getTemplateDir as jest.Mock).mockReturnValue("/templates");
    (Template.create as jest.Mock).mockResolvedValue(mockTemplate);

    builder = new RenderStrategyBuilder();
  });

  describe("configuration", () => {
    it("should set and store config", () => {
      const result = builder.setConfig(mockConfig);

      expect(builder["config"]).toBe(mockConfig);
      expect(result).toBe(builder);
    });

    it("should set and store extension", () => {
      const result = builder.setExtension("md");

      expect(builder["extension"]).toBe("md");
      expect(result).toBe(builder);
    });

    it("should set and store name", () => {
      const result = builder.setName("markdown");

      expect(builder["name"]).toBe("markdown");
      expect(result).toBe(builder);
    });
  });

  describe("template loading", () => {
    beforeEach(() => {
      builder.setConfig(mockConfig);
      builder.setExtension("md");
    });

    it("should load all required templates", async () => {
      const result = await builder.loadTemplates();

      expect(Template.create).toHaveBeenCalledTimes(3);
      expect(result).toBe(builder);
      expect(builder["templatePage"]).toBeTruthy();
      expect(builder["templateDirectory"]).toBeTruthy();
      expect(builder["templateFile"]).toBeTruthy();
    });

    it("should handle template loading errors", async () => {
      (Template.create as jest.Mock).mockRejectedValue(
        new Error("Load failed")
      );

      await expect(builder.loadTemplates()).rejects.toThrow("Load failed");
    });
  });

  describe("build", () => {
    it("should build Markdown strategy when configured", async () => {
      await setupBuilder("markdown", "md");

      const result = builder.build();

      expect(result).toBeInstanceOf(RenderMarkdownStrategy);
    });

    it("should build HTML strategy when configured", async () => {
      await setupBuilder("html", "html");

      const result = builder.build();

      expect(result).toBeInstanceOf(RenderHTMLStrategy);
    });

    it("should throw error if config is missing", () => {
      expect(() => builder.build()).toThrow("Config is required");
    });

    it("should throw error if extension is missing", () => {
      builder.setConfig(mockConfig);

      expect(() => builder.build()).toThrow("Extension is required");
    });

    it("should throw error if name is missing", () => {
      builder.setConfig(mockConfig);
      builder.setExtension("md");

      expect(() => builder.build()).toThrow("Name is required");
    });

    it("should throw error if templates are not loaded", () => {
      builder.setConfig(mockConfig);
      builder.setExtension("md");
      builder.setName("markdown");

      expect(() => builder.build()).toThrow(
        "Templates must be loaded before building"
      );
    });
  });

  // Helper function to setup builder with all required configurations
  async function setupBuilder(
    name: OutputFormat,
    extension: OutputFormatExtension
  ): Promise<void> {
    builder.setConfig(mockConfig).setExtension(extension).setName(name);
    await builder.loadTemplates();
  }
});
