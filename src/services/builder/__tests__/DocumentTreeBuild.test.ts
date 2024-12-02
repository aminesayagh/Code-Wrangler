import { DocumentTreeBuilder } from "../DocumentTreeBuilder";
import { FileTreeBuilder } from "../FileTreeBuilder";
import { RenderableDirectory } from "../../../core/entities/NodeDirectory";
import { RenderableFile } from "../../../core/entities/NodeFile";
import { IRenderStrategy } from "../../renderer/RenderStrategy";
import { Config } from "../../../utils/config";
import { logger } from "../../../utils/logger";
import { FileType } from "../../../types/type";

jest.mock("../FileTreeBuilder");
jest.mock("../../../core/entities/NodeDirectory");
jest.mock("../../../core/entities/NodeFile");
jest.mock("../../../utils/logger");
jest.mock("../../../utils/config");

describe("DocumentTreeBuilder", () => {
  let mockConfig: jest.Mocked<Config>;
  let mockRenderStrategy: jest.Mocked<IRenderStrategy>;
  let documentTreeBuilder: DocumentTreeBuilder;
  let mockFileTreeBuilder: jest.Mocked<FileTreeBuilder>;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Set up mock config
    mockConfig = {
      get: jest.fn()
    } as unknown as jest.Mocked<Config>;

    // Set up mock render strategy
    mockRenderStrategy = {
      renderFile: jest.fn(),
      renderDirectory: jest.fn(),
      loadTemplates: jest.fn(),
      render: jest.fn(),
      dispose: jest.fn()
    };

    // Set up mock FileTreeBuilder
    mockFileTreeBuilder = {
      build: jest.fn()
    } as unknown as jest.Mocked<FileTreeBuilder>;

    (FileTreeBuilder as jest.Mock).mockImplementation(
      () => mockFileTreeBuilder
    );

    // Create instance of DocumentTreeBuilder
    documentTreeBuilder = new DocumentTreeBuilder(mockConfig, [
      mockRenderStrategy
    ]);
  });

  describe("build", () => {
    it("should successfully build a document tree with a single file", async () => {
      const mockFileNode = {
        name: "test.txt",
        path: "/test/test.txt",
        type: FileType.File
      };

      mockFileTreeBuilder.build.mockResolvedValue(mockFileNode);

      (RenderableFile as jest.Mock).mockImplementation(() => ({
        bundle: jest.fn().mockResolvedValue(undefined)
      }));

      await documentTreeBuilder.build();

      expect(mockFileTreeBuilder.build).toHaveBeenCalledTimes(1);
      expect(RenderableFile).toHaveBeenCalledWith(
        "test.txt",
        "/test/test.txt",
        [mockRenderStrategy]
      );
    });

    it("should successfully build a document tree with a directory structure", async () => {
      const mockTree = {
        name: "root",
        path: "/test",
        type: FileType.Directory,
        children: [
          {
            name: "test.txt",
            path: "/test/test.txt",
            type: FileType.File
          },
          {
            name: "subdir",
            path: "/test/subdir",
            type: FileType.Directory,
            children: [
              {
                name: "subfile.txt",
                path: "/test/subdir/subfile.txt",
                type: FileType.File
              }
            ]
          }
        ]
      };

      mockFileTreeBuilder.build.mockResolvedValue(mockTree);

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

      expect(mockFileTreeBuilder.build).toHaveBeenCalledTimes(1);
      expect(RenderableDirectory).toHaveBeenCalledTimes(2);
      expect(RenderableFile).toHaveBeenCalledTimes(2);
      expect(mockDirectory.addChild).toHaveBeenCalledTimes(3);
    });

    it("should handle errors during tree building", async () => {
      const error = new Error("Build failed");
      mockFileTreeBuilder.build.mockRejectedValue(error);

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
        type: FileType.Directory,
        children: [
          {
            name: "test.txt",
            path: "/test/test.txt",
            type: FileType.File
          }
        ]
      };

      mockFileTreeBuilder.build.mockResolvedValue(mockTree);
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
        type: FileType.Directory,
        children: []
      };

      mockFileTreeBuilder.build.mockResolvedValue(mockTree);

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
        type: FileType.Directory,
        children: []
      };

      mockFileTreeBuilder.build.mockResolvedValue(mockTree);

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
