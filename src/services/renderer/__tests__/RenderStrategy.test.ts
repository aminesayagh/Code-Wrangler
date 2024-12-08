import { NodeDirectory } from "../../../core/entities/NodeDirectory";
import { NodeFile } from "../../../core/entities/NodeFile";
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { JobConfig } from "../../../utils/config";
import { RenderBaseStrategy } from "../RenderStrategy";

jest.mock("../../../core/entities/NodeFile");
jest.mock("../../../core/entities/NodeDirectory");
jest.mock("../../../infrastructure/templates/TemplateEngine");
jest.mock("../../../utils/config");

class TestRenderStrategy extends RenderBaseStrategy {
  public constructor(
    config: JobConfig,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    super(config, "markdown", templatePage, templateDirectory, templateFile);
  }
}

describe("RenderBaseStrategy", () => {
  const PROJECT_NAME = "Test Project";
  const RENDERED_FILE = "rendered file";
  const RENDERED_DIRECTORY = "rendered directory";
  const RENDERED_PAGE = "rendered page";

  let mockConfig: jest.Mocked<JobConfig>;
  let mockTemplatePage: jest.Mocked<Template>;
  let mockTemplateDirectory: jest.Mocked<Template>;
  let mockTemplateFile: jest.Mocked<Template>;
  let strategy: TestRenderStrategy;
  let mockFile: jest.Mocked<NodeFile>;
  let mockDirectory: jest.Mocked<NodeDirectory>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      get: jest.fn().mockReturnValue(PROJECT_NAME),
      global: {
        get: jest.fn().mockReturnValue(PROJECT_NAME)
      }
    } as unknown as jest.Mocked<JobConfig>;

    mockTemplatePage = {
      content: "page template",
      render: jest.fn().mockReturnValue(RENDERED_PAGE)
    } as unknown as jest.Mocked<Template>;

    mockTemplateDirectory = {
      content: "directory template",
      render: jest.fn().mockReturnValue(RENDERED_DIRECTORY)
    } as unknown as jest.Mocked<Template>;

    mockTemplateFile = {
      content: "file template",
      render: jest.fn().mockReturnValue(RENDERED_FILE)
    } as unknown as jest.Mocked<Template>;

    mockFile = {
      type: "file",
      name: "test.ts",
      path: "/test/test.ts",
      extension: ".ts",
      content: "test content",
      size: 100,
      deep: 1,
      props: {}
    } as unknown as jest.Mocked<NodeFile>;

    mockDirectory = {
      type: "directory",
      name: "test",
      path: "/test",
      size: 200,
      length: 2,
      deepLength: 3,
      deep: 0,
      children: [],
      props: {}
    } as unknown as jest.Mocked<NodeDirectory>;

    strategy = new TestRenderStrategy(
      mockConfig,
      mockTemplatePage,
      mockTemplateDirectory,
      mockTemplateFile
    );
  });

  describe("render", () => {
    it("should render a directory with nested structure", () => {
      const childFile = {
        ...mockFile,
        name: "child.ts"
      } as unknown as jest.Mocked<NodeFile>;
      const subDirectory = {
        ...mockDirectory,
        name: "subdir",
        children: [childFile]
      } as unknown as jest.Mocked<NodeDirectory>;
      mockDirectory.children = [mockFile, subDirectory];

      const result = strategy.render(mockDirectory);

      expect(mockTemplatePage.render).toHaveBeenCalledWith({
        PROJECT_NAME,
        GENERATION_DATE: expect.any(String),
        TOTAL_FILES: 2,
        TOTAL_DIRECTORIES: 3,
        TOTAL_SIZE: 200,
        CONTENT: RENDERED_DIRECTORY
      });
      expect(result).toBe(RENDERED_PAGE);
    });

    it("should render a single file", () => {
      const result = strategy.render(mockFile as NodeFile);

      expect(mockTemplatePage.render).toHaveBeenCalledWith({
        PROJECT_NAME,
        GENERATION_DATE: expect.any(String),
        TOTAL_SIZE: 100,
        CONTENT: RENDERED_FILE
      });
      expect(result).toBe(RENDERED_PAGE);
    });

    it("should render an empty directory", () => {
      mockDirectory.children = [];

      const result = strategy.render(mockDirectory as NodeDirectory);

      expect(mockTemplateDirectory.render).toHaveBeenCalledWith({
        DIRECTORY_NAME: "test",
        DIRECTORY_PATH: "/test",
        DIRECTORY_SIZE: 200,
        DIRECTORY_LENGTH: 2,
        DIRECTORY_DEEP_LENGTH: 3,
        DIRECTORY_DEPTH: 0,
        DIRECTORY_CONTENT: "",
        ...mockDirectory.props
      });
      expect(result).toBe(RENDERED_PAGE);
    });
  });

  describe("template handling", () => {
    it("should handle file template data", () => {
      strategy.render(mockFile as NodeFile);

      expect(mockTemplateFile.render).toHaveBeenCalledWith({
        FILE_NAME: "test.ts",
        FILE_EXTENSION: "ts",
        FILE_SIZE: 100,
        FILE_DEPTH: 1,
        FILE_LINES: 1,
        FILE_PATH: "/test/test.ts",
        FILE_CONTENTS: "test content",
        ...mockFile.props
      });
    });
  });

  describe("disposal", () => {
    it("should dispose all templates", () => {
      mockTemplatePage.dispose = jest.fn();
      mockTemplateDirectory.dispose = jest.fn();
      mockTemplateFile.dispose = jest.fn();

      strategy.dispose();

      expect(mockTemplatePage.dispose).toHaveBeenCalled();
      expect(mockTemplateDirectory.dispose).toHaveBeenCalled();
      expect(mockTemplateFile.dispose).toHaveBeenCalled();
    });
  });

  describe("name", () => {
    it("should return the strategy name", () => {
      expect(strategy.getName()).toBe("markdown");
    });
  });
});
