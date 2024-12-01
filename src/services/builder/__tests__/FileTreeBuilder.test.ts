import { FileTreeBuilder } from "../FileTreeBuilder";
import { Config } from "../../../utils/config";
import { DocumentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
import { FileType } from "../../../types/type";
import FileHidden from "../FileHidden";

jest.mock("../../../utils/config");
jest.mock("../../../infrastructure/filesystem/DocumentFactory");
jest.mock("../FileHidden");

describe("FileTreeBuilder", () => {
  let mockConfig: jest.Mocked<Config>;
  let fileTreeBuilder: FileTreeBuilder;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      get: jest.fn(),
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
      shouldExclude: jest.fn().mockReturnValue(false),
    }));

    fileTreeBuilder = new FileTreeBuilder(mockConfig);
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
    it("should throw error if root directory doesn't exist", async () => {
      (DocumentFactory.exists as jest.Mock).mockReturnValue(false);
      await expect(fileTreeBuilder.build()).rejects.toThrow(
        "Directory /test/dir does not exist"
      );
    });

    it("should build root node with no children if directory is empty", async () => {
      (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
      (DocumentFactory.getStats as jest.Mock).mockResolvedValue({
        isDirectory: true,
        isFile: false,
        size: 0,
        created: new Date(),
        modified: new Date(),
        accessed: new Date(),
        permissions: {
          readable: true,
          writable: true,
          executable: true,
        },
      });
      (DocumentFactory.baseName as jest.Mock).mockReturnValue("dir");
      (DocumentFactory.readDir as jest.Mock).mockResolvedValue([]);

      const result = await fileTreeBuilder.build();

      expect(result).toEqual({
        name: "dir",
        path: "/test/dir",
        type: FileType.Directory,
        children: [],
      });
    });

    it("should build tree with files and directories", async () => {
      (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
      (DocumentFactory.baseName as jest.Mock).mockImplementation((path) =>
        path.split("/").pop()
      );
      (DocumentFactory.join as jest.Mock).mockImplementation((...paths) =>
        paths.join("/")
      );

      // Setup mock responses for each path
      const mockStats = new Map([
        ["/test/dir", { isDirectory: true, isFile: false }],
        ["/test/dir/file1.txt", { isDirectory: false, isFile: true }],
        ["/test/dir/subdir", { isDirectory: true, isFile: false }],
        ["/test/dir/subdir/file2.txt", { isDirectory: false, isFile: true }],
      ]);

      (DocumentFactory.getStats as jest.Mock).mockImplementation(
        async (path) => ({
          ...mockStats.get(path),
          size: 1000,
          created: new Date(),
          modified: new Date(),
          accessed: new Date(),
          permissions: { readable: true, writable: true, executable: true },
        })
      );

      (DocumentFactory.readDir as jest.Mock)
        .mockResolvedValueOnce(["file1.txt", "subdir"])
        .mockResolvedValueOnce(["file2.txt"]);

      const result = await fileTreeBuilder.build();

      expect(result).toEqual({
        name: "dir",
        path: "/test/dir",
        type: FileType.Directory,
        children: [
          {
            name: "file1.txt",
            path: "/test/dir/file1.txt",
            type: FileType.File,
          },
          {
            name: "subdir",
            path: "/test/dir/subdir",
            type: FileType.Directory,
            children: [
              {
                name: "file2.txt",
                path: "/test/dir/subdir/file2.txt",
                type: FileType.File,
              },
            ],
          },
        ],
      });
    });

    it("should respect maxDepth configuration", async () => {
      mockConfig.get.mockImplementation((key) =>
        key === "maxDepth" ? 1 : mockConfig.get(key)
      );

      (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
      (DocumentFactory.baseName as jest.Mock).mockImplementation((path) =>
        path.split("/").pop()
      );
      (DocumentFactory.join as jest.Mock).mockImplementation((...paths) =>
        paths.join("/")
      );

      const mockStats = new Map([
        ["/test/dir", { isDirectory: true, isFile: false }],
        ["/test/dir/subdir", { isDirectory: true, isFile: false }],
      ]);

      (DocumentFactory.getStats as jest.Mock).mockImplementation(
        async (path) => ({
          ...mockStats.get(path),
          size: 1000,
          created: new Date(),
          modified: new Date(),
          accessed: new Date(),
          permissions: { readable: true, writable: true, executable: true },
        })
      );

      (DocumentFactory.readDir as jest.Mock).mockResolvedValue(["subdir"]);

      const result = await fileTreeBuilder.build();

      expect(result).toEqual({
        name: "dir",
        path: "/test/dir",
        type: FileType.Directory,
        children: [
          {
            name: "subdir",
            path: "/test/dir/subdir",
            type: FileType.Directory,
            children: [
              {
                name: "subdir",
                path: "/test/dir/subdir/subdir",
                type: FileType.File,
              },
            ],
          },
        ],
      });
    });

    it("should handle file exclusion", async () => {
      (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
      (DocumentFactory.baseName as jest.Mock).mockImplementation((path) =>
        path.split("/").pop()
      );
      (DocumentFactory.join as jest.Mock).mockImplementation((...paths) =>
        paths.join("/")
      );

      const mockFileHidden = {
        shouldExclude: jest
          .fn()
          .mockReturnValueOnce(false) // include.txt
          .mockReturnValueOnce(true), // exclude.txt
      };

      (FileHidden as jest.Mock).mockImplementation(() => mockFileHidden);

      (DocumentFactory.getStats as jest.Mock).mockImplementation(
        async (path) => ({
          isDirectory: path === "/test/dir",
          isFile: path !== "/test/dir",
          size: 1000,
          created: new Date(),
          modified: new Date(),
          accessed: new Date(),
          permissions: { readable: true, writable: true, executable: true },
        })
      );

      (DocumentFactory.readDir as jest.Mock).mockResolvedValue([
        "include.txt",
        "exclude.txt",
      ]);

      const result = await fileTreeBuilder.build();

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
