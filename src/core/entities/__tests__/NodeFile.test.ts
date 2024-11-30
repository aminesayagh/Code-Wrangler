import { NodeFile } from "../NodeFile";
import { mockPath, getContent } from "../../../__mocks__/mockFileSystem";

class TestFile extends NodeFile {
  constructor(name: string, pathName: string) {
    super(name, pathName);
  }
  public render(): void {
    console.log("render");
  }
}

describe("NodeFile", () => {
  let testFile: TestFile;
  const testName = "file1.ts";
  const testPath = mockPath() + "/" + testName;

  beforeEach(() => {
    testFile = new TestFile(testName, testPath);
  });

  test("constructor initializes name, path, and extension correctly", () => {
    expect(testFile.name).toBe(testName);
    expect(testFile.path).toBe(testPath);
    expect(testFile.extension).toBe(".ts");
  });

  test("Check props value before bundle", () => {
    const props = testFile.props;
    expect(props).toMatchObject({
      name: testName,
      path: testPath,
      deep: 0,
      size: 0,
      extension: ".ts",
    });
  });

  test("Bundle method sets content correctly", async () => {
    await testFile.bundle();
    const content = getContent("root/file1.ts");
    expect(testFile.content).toBe(content);
  });

  test("Check props value after bundle", async () => {
    await testFile.bundle();
    const props = testFile.props;
    expect(props).toMatchObject({
      name: expect.any(String),
      path: expect.any(String),
      deep: expect.any(Number),
      size: expect.any(Number),
      extension: expect.any(String),
    });
  });
});
