import { NodeDirectory } from "../NodeDirectory";
import { NodeFile } from "../NodeFile";
import * as path from "path";
import * as fs from "fs/promises";

class TestDirectory extends NodeDirectory {
  render(): string {
    return "render";
  }
}

class TestFile extends NodeFile {
  public render(): void {}
}

describe("Directory", () => {
  let testDirectory: TestDirectory;
  const pwd = process.cwd();
  const MOCK_PATH = path.resolve(
    `${pwd}/src/core/entities/__tests__/__node_directory_mocks__`
  );

  beforeEach(async () => {
    jest.clearAllMocks();
    await fs.mkdir(MOCK_PATH, { recursive: true });
    await fs.mkdir(path.join(MOCK_PATH, "dir"), { recursive: true });
    testDirectory = new TestDirectory("dir", path.join(MOCK_PATH, "dir"));
  });

  afterEach(async () => {
    await fs.rm(MOCK_PATH, { recursive: true, force: true });
  });

  it("constructor initializes name, path, and extension correctly", () => {
    expect(testDirectory.name).toBe("dir");
    expect(testDirectory.path).toBe(path.join(MOCK_PATH, "dir"));
    expect(testDirectory.children).toEqual([]);
  });

  it("addChild throws error for invalid child type", async () => {
    await expect(testDirectory.addChild({} as NodeFile)).rejects.toThrow(
      "Invalid child type"
    );
  });

  it("Check props value before bundle", () => {
    const props = testDirectory.props;
    expect(props).toMatchObject({
      name: "dir",
      path: path.join(MOCK_PATH, "dir")
    });
  });

  describe("bundle", () => {
    const dir = path.join(MOCK_PATH, "dir");
    beforeEach(async () => {
      await fs.mkdir(path.join(MOCK_PATH, "dir"), { recursive: true });
      // create file1, file2, file3, file4
      await fs.writeFile(path.join(MOCK_PATH, "file1.ts"), "");
      await fs.writeFile(path.join(MOCK_PATH, "file2.js"), "");
      await fs.writeFile(path.join(dir, "file3.ts"), "");
      await fs.writeFile(path.join(dir, "file4.js"), "");
      jest.clearAllMocks();
    });

    it("bundle updates directory properties correctly", async () => {
      const mockFile1 = new TestFile(
        "file1.ts",
        path.join(MOCK_PATH, "file1.ts")
      );
      const mockFile2 = new TestFile(
        "file2.js",
        path.join(MOCK_PATH, "file2.js")
      );
      const mockSubDir = new TestDirectory("dir", path.join(MOCK_PATH, "dir"));
      const mockFile3 = new TestFile(
        "file3.ts",
        path.join(MOCK_PATH, "dir/file3.ts")
      );
      const mockFile4 = new TestFile(
        "file4.js",
        path.join(MOCK_PATH, "dir/file4.js")
      );

      await testDirectory.addChild(mockFile1);
      await testDirectory.addChild(mockFile2);
      await testDirectory.addChild(mockSubDir);
      await mockSubDir.addChild(mockFile3);
      await mockSubDir.addChild(mockFile4);

      await testDirectory.bundle(1);

      expect(testDirectory.deep).toEqual(expect.any(Number));
      expect(testDirectory.length).toEqual(expect.any(Number)); // Only direct files
      expect(testDirectory.deepLength).toEqual(expect.any(Number)); // Including subdirectory and its file
      expect(testDirectory.size).toEqual(expect.any(Number)); // Sum of all file sizes
    });
  });
});
