import { NodeFile } from "../NodeFile";
import * as path from "path";
import * as fs from "fs/promises";

class TestFile extends NodeFile {
  public render(): void {}
}

describe("NodeFile", () => {
  let testFile: TestFile;
  const pwd = process.cwd();
  const MOCK_PATH = path.resolve(
    `${pwd}/src/core/entities/__tests__/__node_file_mocks__`
  );
  const testName = "file1.ts";
  const testPath = path.join(MOCK_PATH, testName);

  beforeEach(async () => {
    jest.clearAllMocks();
    try {
      await fs.mkdir(MOCK_PATH, { recursive: true });
      await fs.writeFile(testPath, "");
    } catch (error) {
      console.error(error);
    }
    testFile = new TestFile(testName, testPath);
  });

  afterEach(async () => {
    await fs.rm(MOCK_PATH, { recursive: true, force: true });
  });

  describe("constructor", () => {
    it("initializes name, path, and extension correctly", () => {
      expect(testFile.name).toBe(testName);
      expect(testFile.path).toBe(testPath);
      expect(testFile.extension).toBe(".ts");
    });
  });

  describe("bundle", () => {
    it("Check props value before bundle", () => {
      const props = testFile.props;
      expect(props).toMatchObject({
        name: testName,
        path: testPath,
        deep: 0,
        size: 0,
        extension: ".ts"
      });
    });

    it("Bundle method sets content correctly", async () => {
      await testFile.bundle();
      const content = "";
      expect(testFile.content).toBe(content);
    });

    it("Check props value after bundle", async () => {
      await testFile.bundle();
      const props = testFile.props;
      expect(props).toMatchObject({
        name: expect.any(String),
        path: expect.any(String),
        deep: expect.any(Number),
        size: expect.any(Number),
        extension: expect.any(String)
      });
    });
  });
});
