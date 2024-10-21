import { File } from "../File";
import { mockPath, getContent } from "../../__mocks__/mockFileSystem";

class TestFile extends File {
  constructor(name: string, pathName: string) {
    super(name, pathName);
  }
  public render(): void {
    console.log("render");
  }
}

describe("File", () => {
  let testFile: TestFile;
  const testName = "file1.ts";
  const testPath = mockPath() + "/" + testName;
  const mockSize = 29;

  beforeEach(() => {
    testFile = new TestFile(testName, testPath);
    jest.clearAllMocks();
  });

  test("constructor initializes name, path, and extension correctly", () => {
    expect(testFile.name).toBe(testName);
    expect(testFile.path).toBe(testPath);
    expect(testFile._extension).toBe(".ts");
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
    const children = testFile.children;
    const content = getContent("root/file1.ts");
    expect(children).toBe(content);
  });

  test("Check props value after bundle", async () => {
    await testFile.bundle();
    const props = testFile.props;
    expect(props).toMatchObject({
      name: testName,
      path: testPath,
      deep: 0,
      size: mockSize,
      extension: ".ts",
    });
  });
});
