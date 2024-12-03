import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
import { fileStatsService } from "../../../infrastructure/filesystem/FileStats";
import { FILE_TYPE } from "../../../types/type";
import { Config } from "../../../utils/config";
import FileHidden from "../FileHidden";
import { NodeTreeBuilder } from "../NodeTreeBuilder";

jest.mock("../../../utils/config");
jest.mock("../../../infrastructure/filesystem/DocumentFactory");
jest.mock("../FileHidden");
jest.mock("../../../infrastructure/filesystem/FileStats");
describe("NodeTreeBuilder", () => {
  let mockConfig: jest.Mocked<Config>;
  let nodeTreeBuilder: NodeTreeBuilder;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      get: jest.fn()
    } as unknown as jest.Mocked<Config>;

    mockConfig.get.mockImplementation((key: string) => {
      switch (key) {
        case "dir":
          return "/test/dir";
        case "pattern":
          return ".*";
        case "maxDepth":
          return 10;
        case "excludePatterns":
          return ["node_modules/**"];
        case "additionalIgnoreFiles":
          return [];
        default:
          return undefined;
      }
    });

    // Configure FileHidden mock with default behavior
    (FileHidden as jest.Mock).mockImplementation(() => ({
      shouldExclude: jest.fn().mockReturnValue(false)
    }));

    nodeTreeBuilder = new NodeTreeBuilder(mockConfig);
  });

  describe("initialization", () => {
    it("should initialize with correct config values", () => {
      expect(mockConfig.get).toHaveBeenCalledWith("dir");
      expect(mockConfig.get).toHaveBeenCalledWith("pattern");
      expect(mockConfig.get).toHaveBeenCalledWith("maxDepth");
      expect(mockConfig.get).toHaveBeenCalledWith("excludePatterns");
      expect(mockConfig.get).toHaveBeenCalledWith("additionalIgnoreFiles");
    });
  });

  describe("build", () => {
    const SUBDIR_PATH = "/test/dir/subdir";

    it("should throw error if root directory doesn't exist", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(false);
      await expect(nodeTreeBuilder.build()).rejects.toThrow(
        "Directory /test/dir does not exist"
      );
    });

    it("should build root node with no children if directory is empty", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(true);
      (fileStatsService as jest.Mock).mockResolvedValue({
        isDirectory: true,
        isFile: false,
        size: 0,
        created: new Date(),
        modified: new Date(),
        accessed: new Date(),
        permissions: {
          readable: true,
          writable: true,
          executable: true
        }
      });
      (documentFactory.baseName as jest.Mock).mockReturnValue("dir");
      (documentFactory.readDir as jest.Mock).mockResolvedValue([]);

      const result = await nodeTreeBuilder.build();

      expect(result).toEqual({
        name: "dir",
        path: "/test/dir",
        type: FILE_TYPE.Directory,
        children: []
      });
    });

    it("should build tree with files and directories", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(true);
      (documentFactory.baseName as jest.Mock).mockImplementation(path =>
        path.split("/").pop()
      );
      (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
        paths.join("/")
      );

      // Setup mock responses for each path
      const mockStats = new Map([
        ["/test/dir", { isDirectory: true, isFile: false }],
        ["/test/dir/file1.txt", { isDirectory: false, isFile: true }],
        [SUBDIR_PATH, { isDirectory: true, isFile: false }],
        [`${SUBDIR_PATH}/file2.txt`, { isDirectory: false, isFile: true }]
      ]);

      (fileStatsService as jest.Mock).mockImplementation(path => ({
        ...mockStats.get(path),
        size: 1000,
        created: new Date(),
        modified: new Date(),
        accessed: new Date(),
        permissions: { readable: true, writable: true, executable: true }
      }));

      (documentFactory.readDir as jest.Mock)
        .mockResolvedValueOnce(["file1.txt", "subdir"])
        .mockResolvedValueOnce(["file2.txt"]);

      const result = await nodeTreeBuilder.build();

      expect(result).toEqual({
        name: "dir",
        path: "/test/dir",
        type: FILE_TYPE.Directory,
        children: [
          {
            name: "file1.txt",
            path: "/test/dir/file1.txt",
            type: FILE_TYPE.File
          },
          {
            name: "subdir",
            path: SUBDIR_PATH,
            type: FILE_TYPE.Directory,
            children: [
              {
                name: "file2.txt",
                path: `${SUBDIR_PATH}/file2.txt`,
                type: FILE_TYPE.File
              }
            ]
          }
        ]
      });
    });

    it("should respect maxDepth configuration", async () => {
      mockConfig.get.mockImplementation(key =>
        key === "maxDepth" ? 1 : mockConfig.get(key)
      );

      (documentFactory.exists as jest.Mock).mockReturnValue(true);
      (documentFactory.baseName as jest.Mock).mockImplementation(path =>
        path.split("/").pop()
      );
      (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
        paths.join("/")
      );

      const mockStats = new Map([
        ["/test/dir", { isDirectory: true, isFile: false }],
        [SUBDIR_PATH, { isDirectory: true, isFile: false }]
      ]);

      (fileStatsService as jest.Mock).mockImplementation(path => ({
        ...mockStats.get(path),
        size: 1000,
        created: new Date(),
        modified: new Date(),
        accessed: new Date(),
        permissions: { readable: true, writable: true, executable: true }
      }));

      (documentFactory.readDir as jest.Mock).mockResolvedValue(["subdir"]);

      const result = await nodeTreeBuilder.build();

      expect(result).toEqual({
        name: "dir",
        path: "/test/dir",
        type: FILE_TYPE.Directory,
        children: [
          {
            name: "subdir",
            path: SUBDIR_PATH,
            type: FILE_TYPE.Directory,
            children: [
              {
                name: "subdir",
                path: `${SUBDIR_PATH}/subdir`,
                type: FILE_TYPE.File
              }
            ]
          }
        ]
      });
    });

    it("should handle file exclusion", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(true);
      (documentFactory.baseName as jest.Mock).mockImplementation(path =>
        path.split("/").pop()
      );
      (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
        paths.join("/")
      );

      const mockFileHidden = {
        shouldExclude: jest
          .fn()
          .mockReturnValueOnce(false) // include.txt
          .mockReturnValueOnce(true) // exclude.txt
      };

      (FileHidden as jest.Mock).mockImplementation(() => mockFileHidden);

      (fileStatsService as jest.Mock).mockImplementation(path => ({
        isDirectory: path === "/test/dir",
        isFile: path !== "/test/dir",
        size: 1000,
        created: new Date(),
        modified: new Date(),
        accessed: new Date(),
        permissions: { readable: true, writable: true, executable: true }
      }));

      (documentFactory.readDir as jest.Mock).mockResolvedValue([
        "include.txt",
        "exclude.txt"
      ]);

      const result = await nodeTreeBuilder.build();

      expect(result.children).toHaveLength(2);
      const children = result.children;
      expect(children).not.toBeNull();
      if (children) {
        const child1 = children[0];
        const child2 = children[1];
        expect(child1?.name).toBe("include.txt");
        expect(child2?.name).toBe("exclude.txt");
      }
    });
  });
});
