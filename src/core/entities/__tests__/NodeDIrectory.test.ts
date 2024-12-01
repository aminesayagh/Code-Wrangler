import { NodeDirectory } from "../NodeDIrectory";
import { NodeFile } from "../NodeFile";
import { mockPath } from "../../../__mocks__/mockFileSystem";

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

  beforeEach(() => {
    testDirectory = new TestDirectory("dir", mockPath() + "/dir");
  });

  test("constructor initializes name, path, and extension correctly", () => {
    expect(testDirectory.name).toBe("dir");
    expect(testDirectory.path).toBe(mockPath() + "/dir");
    expect(testDirectory.children).toEqual([]);
  });

  test("addChild throws error for invalid child type", async () => {
    await expect(testDirectory.addChild({} as NodeFile)).rejects.toThrow(
      "Invalid child type"
    );
  });

  test("Check props value before bundle", () => {
    const props = testDirectory.props;
    expect(props).toMatchObject({
      name: "dir",
      path: mockPath() + "/dir",
    });
  });

  test("bundle updates directory properties correctly", async () => {
    const mockFile1 = new TestFile("file1.ts", mockPath() + "/file1.ts");
    const mockFile2 = new TestFile("file2.js", mockPath() + "/file2.js");
    const mockSubDir = new TestDirectory("dir", mockPath() + "/dir");
    const mockFile3 = new TestFile("file3.ts", mockPath() + "/dir/file3.ts");
    const mockFile4 = new TestFile("file4.js", mockPath() + "/dir/file4.js");

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
