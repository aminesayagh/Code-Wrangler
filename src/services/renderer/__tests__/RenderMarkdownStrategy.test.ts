import { NodeFile } from "../../../core/entities/NodeFile";
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { RenderMarkdownStrategy } from "../strategies/MarkdownStrategy";

jest.mock("../../../core/entities/NodeFile");
jest.mock("../../../infrastructure/templates/TemplateEngine");
jest.mock("../../../utils/config");

describe("RenderMarkdownStrategy", () => {
  let strategy: RenderMarkdownStrategy;
  let mockConfig: jest.Mocked<Config>;
  let mockTemplatePage: jest.Mocked<Template>;
  let mockTemplateDirectory: jest.Mocked<Template>;
  let mockTemplateFile: jest.Mocked<Template>;
  let mockFile: jest.Mocked<NodeFile>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      get: jest.fn()
    } as unknown as jest.Mocked<Config>;

    mockTemplatePage = {
      content: "# {{PROJECT_NAME}}\n{{CONTENT}}",
      render: jest.fn().mockReturnValue("rendered page")
    } as unknown as jest.Mocked<Template>;

    mockTemplateDirectory = {
      content: "## {{DIRECTORY_NAME}}\n{{DIRECTORY_CONTENT}}",
      render: jest.fn().mockReturnValue("rendered directory")
    } as unknown as jest.Mocked<Template>;

    mockTemplateFile = {
      content:
        "### {{FILE_NAME}}\n```{{FILE_EXTENSION}}\n{{FILE_CONTENTS}}\n```",
      render: jest.fn().mockReturnValue("rendered file")
    } as unknown as jest.Mocked<Template>;

    mockFile = {
      name: "test.ts",
      extension: ".ts",
      content: "const test = 'hello';",
      path: "/test/test.ts",
      deep: 1,
      size: 100,
      props: {}
    } as unknown as jest.Mocked<NodeFile>;

    strategy = new RenderMarkdownStrategy(
      mockConfig,
      mockTemplatePage,
      mockTemplateDirectory,
      mockTemplateFile
    );
  });

  describe("initialization", () => {
    it("should be instantiated with correct output format", () => {
      expect(strategy.getName()).toBe("markdown");
    });
  });

  describe("file rendering", () => {
    it("should render file with markdown code block", () => {
      strategy.renderFile(mockFile);

      expect(mockTemplateFile.render).toHaveBeenCalledWith({
        FILE_NAME: "test.ts",
        FILE_EXTENSION: "ts",
        FILE_SIZE: 100,
        FILE_DEPTH: 1,
        FILE_LINES: 1,
        FILE_PATH: "/test/test.ts",
        FILE_CONTENTS: "const test = 'hello';",
        ...mockFile.props
      });
    });
  });
});
