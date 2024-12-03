import { NodeFile } from "../../../core/entities/NodeFile";
import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
import { fileStatsService } from "../../../infrastructure/filesystem/FileStats";
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { OutputFormatExtension } from "../../../utils/config/schema";
import { BaseRenderStrategy } from "../RenderStrategy";

jest.mock("../../../utils/config");
jest.mock("../../../core/entities/NodeFile");
jest.mock("../../../infrastructure/filesystem/DocumentFactory");
jest.mock("../../../infrastructure/templates/TemplateEngine");
jest.mock("../../../infrastructure/filesystem/FileStats");

class TestRenderStrategy extends BaseRenderStrategy {
  public constructor(config: Config) {
    super(config, "md" as OutputFormatExtension);
  }
}

describe("BaseRenderStrategy", () => {
  let mockConfig: jest.Mocked<Config>;
  let renderStrategy: TestRenderStrategy;
  let mockTemplate: jest.Mocked<Template>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Configure mock config
    mockConfig = {
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case "rootDir":
            return "/test";
          case "templatesDir":
            return "templates";
          case "projectName":
            return "Test Project";
          default:
            return undefined;
        }
      })
    } as unknown as jest.Mocked<Config>;

    // Configure mock template
    mockTemplate = {
      content: "Template content with {{FILE_NAME}}",
      load: jest.fn().mockResolvedValue(undefined),
      render: jest.fn().mockReturnValue("Rendered content")
    } as unknown as jest.Mocked<Template>;

    (Template.create as jest.Mock).mockResolvedValue(mockTemplate);
    (Template.getTemplateDir as jest.Mock).mockReturnValue("templates");

    (fileStatsService as jest.Mock).mockImplementation(() => ({
      isDirectory: true,
      isFile: false,
      size: 0,
      created: new Date(),
      modified: new Date(),
      accessed: new Date()
    }));

    (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
      paths.join("/")
    );
    (documentFactory.exists as jest.Mock).mockReturnValue(true);

    renderStrategy = new TestRenderStrategy(mockConfig);
  });

  describe("loadTemplates", () => {
    it("should successfully load all templates", async () => {
      await renderStrategy.loadTemplates();

      expect(renderStrategy["templates"].page).toBe(mockTemplate);
      expect(renderStrategy["templates"].file).toBe(mockTemplate);
      expect(renderStrategy["templates"].directory).toBe(mockTemplate);
    });
  });

  describe("renderFile", () => {
    it("should render file content correctly", async () => {
      const mockFile = {
        name: "test.txt",
        extension: ".txt",
        size: 1000,
        content: "Test content"
      } as NodeFile;

      await renderStrategy.loadTemplates();
      const result = renderStrategy.renderFile(mockFile);

      expect(result).toBe("Template content with test.txt");
    });

    it("should handle null file content", async () => {
      const mockFile = {
        name: "test.txt",
        extension: ".txt",
        size: 1000,
        content: null
      } as NodeFile;

      await renderStrategy.loadTemplates();
      const result = renderStrategy.renderFile(mockFile);

      expect(result).toBe("Template content with test.txt");
    });

    it("should throw error if file template is not loaded", () => {
      const mockFile = {} as NodeFile;

      expect(() => renderStrategy.renderFile(mockFile)).toThrow(
        "File template is not loaded"
      );
    });
  });

  describe("dispose", () => {
    it("should clear all templates", async () => {
      await renderStrategy.loadTemplates();
      await renderStrategy.dispose();

      expect(renderStrategy["templates"].page).toBeNull();
      expect(renderStrategy["templates"].file).toBeNull();
      expect(renderStrategy["templates"].directory).toBeNull();
    });
  });
});
