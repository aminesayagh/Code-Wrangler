import { RenderableDirectory } from "../../../core/entities/NodeDirectory";
import { RenderableFile } from "../../../core/entities/NodeFile";
import { FILE_TYPE } from "../../../types/type";
import { Config } from "../../../utils/config";
import { logger } from "../../../utils/logger";
import { DocumentTreeBuilder } from "../DocumentTreeBuilder";
import { NodeTreeBuilder } from "../NodeTreeBuilder";

jest.mock("../NodeTreeBuilder");
jest.mock("../../../core/entities/NodeDirectory");
jest.mock("../../../core/entities/NodeFile");
jest.mock("../../../utils/logger");
jest.mock("../../../utils/config");

describe("DocumentTreeBuilder", () => {
  let mockConfig: jest.Mocked<Config>;
  let documentTreeBuilder: DocumentTreeBuilder;
  let mockNodeTreeBuilder: jest.Mocked<NodeTreeBuilder>;
  const TEMPLATE_PATH = "/test/test.txt";

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Set up mock config
    mockConfig = {
      get: jest.fn()
    } as unknown as jest.Mocked<Config>;

    // Set up mock NodeTreeBuilder
    mockNodeTreeBuilder = {
      build: jest.fn()
    } as unknown as jest.Mocked<NodeTreeBuilder>;

    (NodeTreeBuilder as jest.Mock).mockImplementation(
      () => mockNodeTreeBuilder
    );

    // Create instance of DocumentTreeBuilder
    documentTreeBuilder = new DocumentTreeBuilder(mockConfig);
  });

  describe("build", () => {
    it("should successfully build a document tree with a single file", async () => {
      const mockFileNode = {
        name: "test.txt",
        path: TEMPLATE_PATH,
        type: FILE_TYPE.File
      };

      mockNodeTreeBuilder.build.mockResolvedValue(mockFileNode);

      (RenderableFile as jest.Mock).mockImplementation(() => ({
        bundle: jest.fn().mockResolvedValue(undefined)
      }));

      await documentTreeBuilder.build();

      expect(mockNodeTreeBuilder.build).toHaveBeenCalledTimes(1);
      expect(RenderableFile).toHaveBeenCalledWith("test.txt", TEMPLATE_PATH);
    });

    it("should successfully build a document tree with a directory structure", async () => {
      const mockTree = {
        name: "root",
        path: "/test",
        type: FILE_TYPE.Directory,
        children: [
          {
            name: "test.txt",
            path: TEMPLATE_PATH,
            type: FILE_TYPE.File
          },
          {
            name: "subdir",
            path: "/test/subdir",
            type: FILE_TYPE.Directory,
            children: [
              {
                name: "subfile.txt",
                path: "/test/subdir/subfile.txt",
                type: FILE_TYPE.File
              }
            ]
          }
        ]
      };

      mockNodeTreeBuilder.build.mockResolvedValue(mockTree);

      const mockDirectory = {
        addChild: jest.fn().mockResolvedValue(undefined),
        bundle: jest.fn().mockResolvedValue(undefined)
      };

      (RenderableDirectory as jest.Mock).mockImplementation(
        () => mockDirectory
      );
      (RenderableFile as jest.Mock).mockImplementation(() => ({
        bundle: jest.fn().mockResolvedValue(undefined)
      }));

      await documentTreeBuilder.build();

      expect(mockNodeTreeBuilder.build).toHaveBeenCalledTimes(1);
      expect(RenderableDirectory).toHaveBeenCalledTimes(2);
      expect(RenderableFile).toHaveBeenCalledTimes(2);
      expect(mockDirectory.addChild).toHaveBeenCalledTimes(3);
    });

    it("should handle errors during tree building", async () => {
      const error = new Error("Build failed");
      mockNodeTreeBuilder.build.mockRejectedValue(error);

      await expect(documentTreeBuilder.build()).rejects.toThrow("Build failed");
      expect(logger.error).toHaveBeenCalledWith(
        "Error building document tree",
        error
      );
    });

    it("should handle errors during document structure creation", async () => {
      const mockTree = {
        name: "root",
        path: "/test",
        type: FILE_TYPE.Directory,
        children: [
          {
            name: "test.txt",
            path: TEMPLATE_PATH,
            type: FILE_TYPE.File
          }
        ]
      };

      mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
      (RenderableDirectory as jest.Mock).mockImplementation(() => {
        throw new Error("Failed to create directory");
      });

      await expect(documentTreeBuilder.build()).rejects.toThrow(
        "Failed to create directory"
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it("should handle errors during bundle process", async () => {
      const mockTree = {
        name: "root",
        path: "/test",
        type: FILE_TYPE.Directory,
        children: []
      };

      mockNodeTreeBuilder.build.mockResolvedValue(mockTree);

      const mockDirectory = {
        addChild: jest.fn().mockResolvedValue(undefined),
        bundle: jest.fn().mockRejectedValue(new Error("Bundle failed"))
      };

      (RenderableDirectory as jest.Mock).mockImplementation(
        () => mockDirectory
      );

      await expect(documentTreeBuilder.build()).rejects.toThrow(
        "Bundle failed"
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it("should handle empty file trees", async () => {
      const mockTree = {
        name: "root",
        path: "/test",
        type: FILE_TYPE.Directory,
        children: []
      };

      mockNodeTreeBuilder.build.mockResolvedValue(mockTree);

      const mockDirectory = {
        addChild: jest.fn().mockResolvedValue(undefined),
        bundle: jest.fn().mockResolvedValue(undefined)
      };

      (RenderableDirectory as jest.Mock).mockImplementation(
        () => mockDirectory
      );

      await documentTreeBuilder.build();

      expect(mockDirectory.addChild).not.toHaveBeenCalled();
      expect(mockDirectory.bundle).toHaveBeenCalled();
    });
  });
});
