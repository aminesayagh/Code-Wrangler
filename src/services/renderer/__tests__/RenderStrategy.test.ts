import { NodeFile } from "../../../core/entities/NodeFile";
import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { OutputFormatExtension } from "../../../utils/config/schema";
import { BaseRenderStrategy } from "../RenderStrategy";

jest.mock("../../../utils/config");
jest.mock("../../../core/entities/NodeFile");
jest.mock("../../../infrastructure/filesystem/DocumentFactory");
jest.mock("../../../infrastructure/templates/TemplateEngine");

class TestRenderStrategy extends BaseRenderStrategy {
  constructor(config: Config) {
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

    (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
      paths.join("/")
    );
    (documentFactory.exists as jest.Mock).mockReturnValue(true);

    renderStrategy = new TestRenderStrategy(mockConfig);
  });

  describe("loadTemplates", () => {
    it("should successfully load all templates", async () => {
      await renderStrategy.loadTemplates();

      expect(documentFactory.join).toHaveBeenCalledWith("/test", "templates");
      expect(documentFactory.exists).toHaveBeenCalled();
      expect(Template.create).toHaveBeenCalledTimes(3);
    });

    it("should throw error if templates directory doesn't exist", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(false);

      await expect(renderStrategy.loadTemplates()).rejects.toThrow(
        "Templates directory not found"
      );
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
