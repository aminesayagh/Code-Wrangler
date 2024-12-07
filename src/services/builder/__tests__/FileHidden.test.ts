import { IJobConfig, JobConfig } from "../../../utils/config";
import FileHidden from "../FileHidden";

jest.mock("../../../utils/config", () => ({
  JobConfig: {
    load: jest.fn()
  }
}));

describe("FileHidden", () => {
  let mockConfig: jest.Mocked<JobConfig>;
  let fileHidden: FileHidden;

  beforeEach(() => {
    mockConfig = {
      get: jest.fn()
    } as unknown as jest.Mocked<JobConfig>;

    // Set default mock values
    mockConfig.get.mockImplementation((key: keyof IJobConfig) => {
      switch (key) {
        case "ignoreHiddenFiles":
          return true;
        case "excludePatterns":
          return ["node_modules/**", "**/*.test.ts", "dist/**"];
        case "additionalIgnoreFiles":
          return [];
        default:
          return "";
      }
    });

    fileHidden = new FileHidden(mockConfig);
  });

  describe("shouldExclude", () => {
    describe("hidden files handling", () => {
      it("should exclude hidden files when ignoredHiddenFiles is true", () => {
        expect(fileHidden.shouldExclude(".hidden")).toBe(true);
        expect(fileHidden.shouldExclude(".git")).toBe(true);
        expect(fileHidden.shouldExclude(".vscode")).toBe(true);
      });

      it("should not exclude hidden files when ignoreHiddenFiles is false", () => {
        mockConfig.get.mockImplementation((key: string) =>
          key === "ignoreHiddenFiles" ? false : []
        );
        fileHidden = new FileHidden(mockConfig);

        expect(fileHidden.shouldExclude(".hidden")).toBe(false);
        expect(fileHidden.shouldExclude(".git")).toBe(false);
        expect(fileHidden.shouldExclude(".vscode")).toBe(false);
      });
    });

    describe("exclude patterns handling", () => {
      it("should exclude files matching exclude patterns", () => {
        expect(fileHidden.shouldExclude("node_modules/package/file.ts")).toBe(
          true
        );
        expect(fileHidden.shouldExclude("src/file.test.ts")).toBe(true);
        expect(fileHidden.shouldExclude("dist/file.js")).toBe(true);
      });

      it("should not exclude files not matching exclude patterns", () => {
        expect(fileHidden.shouldExclude("src/component.ts")).toBe(false);
        expect(fileHidden.shouldExclude("package.json")).toBe(false);
        expect(fileHidden.shouldExclude("README.md")).toBe(false);
      });

      it("should handle empty exclude patterns", () => {
        mockConfig.get.mockImplementation((key: string) =>
          key === "excludePatterns" ? [] : []
        );
        fileHidden = new FileHidden(mockConfig);

        expect(fileHidden.shouldExclude("node_modules/package/index.js")).toBe(
          false
        );
        expect(fileHidden.shouldExclude("src/component.test.ts")).toBe(false);
      });
    });

    describe("additional ignore files handling", () => {
      it("should exclude files matching additional ignore patterns", () => {
        mockConfig.get.mockImplementation((key: string) => {
          if (key === "additionalIgnoreFiles") {
            return ["*.log", "temp/**"];
          }
          return [];
        });
        fileHidden = new FileHidden(mockConfig);

        expect(fileHidden.shouldExclude("error.log")).toBe(true);
        expect(fileHidden.shouldExclude("temp/cache.json")).toBe(true);
      });

      it("should not exclude files not matching additional ignore patterns", () => {
        mockConfig.get.mockImplementation((key: string) => {
          if (key === "additionalIgnoreFiles") {
            return ["*.log", "temp/**"];
          }
          return [];
        });
        fileHidden = new FileHidden(mockConfig);

        expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
        expect(fileHidden.shouldExclude("data/cache.json")).toBe(false);
      });
    });

    describe("combined patterns handling", () => {
      beforeEach(() => {
        mockConfig.get.mockImplementation((key: keyof IJobConfig) => {
          switch (key) {
            case "ignoreHiddenFiles":
              return true;
            case "excludePatterns":
              return ["*.test.ts", "dist/**"];
            case "additionalIgnoreFiles":
              return ["*.log", "temp/**"];
            default:
              return "";
          }
        });
        fileHidden = new FileHidden(mockConfig);
      });

      it("should exclude files matching any exclusion rule", () => {
        // Hidden files
        expect(fileHidden.shouldExclude(".env")).toBe(true);
        // Exclude patterns
        expect(fileHidden.shouldExclude("component.test.ts")).toBe(true);
        expect(fileHidden.shouldExclude("dist/bundle.js")).toBe(true);
        // Additional ignore files
        expect(fileHidden.shouldExclude("error.log")).toBe(true);
        expect(fileHidden.shouldExclude("temp/file.txt")).toBe(true);
      });

      it("should not exclude files not matching any exclusion rule", () => {
        expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
        expect(fileHidden.shouldExclude("package.json")).toBe(false);
        expect(fileHidden.shouldExclude("docs/README.md")).toBe(false);
      });
    });
  });
});
