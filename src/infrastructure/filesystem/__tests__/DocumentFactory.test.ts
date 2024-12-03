import * as fs from "fs/promises";
import * as path from "path";

import { FILE_TYPE } from "../../../types/type";
import { documentFactory } from "../DocumentFactory";
import { fileStatsService } from "../FileStats";
describe("DocumentFactory", () => {
  const pwd = process.cwd();
  const MOCK_PATH = path.resolve(
    `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/documentFactory`
  );
  const tempDir = path.join(MOCK_PATH, "temp_test");
  const testFilePath = path.join(tempDir, "test.txt");
  const emptyFilePath = path.join(tempDir, "empty.txt");
  const TEST_CONTENT = "test content";
  const DOCUMENT_ERROR_MESSAGE =
    "Document error at nonexistent: File not found";

  beforeEach(async () => {
    jest.clearAllMocks();
    await fs.mkdir(MOCK_PATH, { recursive: true });
    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(testFilePath, TEST_CONTENT);
    await fs.writeFile(emptyFilePath, "");
  });

  afterEach(async () => {
    await fs.rm(MOCK_PATH, { recursive: true });
  });

  describe("type", () => {
    it('should return "file" for a file path', async () => {
      const result = await documentFactory.type(testFilePath);
      expect(result).toBe(FILE_TYPE.File);
    });

    it('should return "directory" for a directory path', async () => {
      const result = await documentFactory.type(MOCK_PATH);
      expect(result).toBe(FILE_TYPE.Directory);
    });

    it("should throw an error if the path doesn't exist on type method", async () => {
      await expect(documentFactory.type("nonexistent")).rejects.toThrow(
        DOCUMENT_ERROR_MESSAGE
      );
    });

    it("should throw an error if the path is a file", async () => {
      await expect(
        documentFactory.type(path.join(MOCK_PATH, "file2.ts"))
      ).rejects.toThrow(
        `Document error at ${path.join(MOCK_PATH, "file2.ts")}: File not found`
      );
    });
  });

  describe("size", () => {
    it("should return the size of a file", async () => {
      const result = await documentFactory.size(testFilePath);
      expect(result).toStrictEqual(expect.any(Number));
    });

    it("should throw an error if the path doesn't exist on size method", async () => {
      await expect(documentFactory.size("nonexistent")).rejects.toThrow(
        DOCUMENT_ERROR_MESSAGE
      );
    });

    it("should throw an error if the path is a directory", async () => {
      await expect(documentFactory.size(MOCK_PATH)).rejects.toThrow(
        `Document error at ${MOCK_PATH}: Path is a directory`
      );
    });

    it("should throw a zero size if the file is empty", async () => {
      const result = await documentFactory.size(emptyFilePath);
      expect(result).toBe(0);
    });
  });

  describe("readFile", () => {
    it("should read file content iwth default options", async () => {
      const content = await documentFactory.readFile(testFilePath);
      expect(content).toBeDefined();
      expect(content).toBeTruthy();
      expect(typeof content).toBe("string");
    });

    it("should read file with custom escoding", async () => {
      const content = await documentFactory.readFile(testFilePath, {
        encoding: "utf-8"
      });
      expect(content).toBeDefined();
      expect(content).toBeTruthy();
      expect(typeof content).toBe("string");
    });

    it("should throw an error if the path doesn't exist on readFile method", async () => {
      await expect(documentFactory.readFile("nonexistent")).rejects.toThrow(
        DOCUMENT_ERROR_MESSAGE
      );
    });

    it("should throw an error if the path is a directory", async () => {
      await expect(documentFactory.readFile(MOCK_PATH)).rejects.toThrow(
        `Document error at ${MOCK_PATH}: Error: EISDIR: illegal operation on a directory, read`
      );
    });
  });

  describe("readDirectory", () => {
    it("should return directory contents with type information", async () => {
      const contents = await documentFactory.readDirectory(MOCK_PATH);
      expect(Array.isArray(contents)).toBe(true);
      expect(contents.length).toBeGreaterThan(0);
      contents.forEach(item => {
        expect(item).toMatchObject({
          name: expect.any(String),
          type: expect.stringMatching(/^(file|directory)$/)
        });
      });
    });

    it("should throw error for non-existent directory", async () => {
      await expect(
        documentFactory.readDirectory("nonexistent")
      ).rejects.toThrow();
    });

    it("should throw error when trying to read a file as directory", async () => {
      await expect(
        documentFactory.readDirectory(path.join(MOCK_PATH, "file1.ts"))
      ).rejects.toThrow();
    });
  });

  describe("exists", () => {
    it("should return true for existing file", () => {
      const exists = documentFactory.exists(testFilePath);
      expect(exists).toBe(true);
    });

    it("should return true for existing directory", () => {
      const exists = documentFactory.exists(MOCK_PATH);
      expect(exists).toBe(true);
    });

    it("should return false for non-existent path", () => {
      const exists = documentFactory.exists("nonexistent");
      expect(exists).toBe(false);
    });
  });

  describe("remove", () => {
    const tempDir = path.join(MOCK_PATH, "temp_remove");

    beforeEach(async () => {
      // Create temp directory and test files
      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(path.join(tempDir, "test.txt"), TEST_CONTENT);
    });

    afterEach(async () => {
      // Cleanup
      if (await documentFactory.exists(tempDir)) {
        await fs.rm(tempDir, { recursive: true });
      }
    });

    it("should remove a file", async () => {
      const filePath = path.join(tempDir, "test.txt");
      await documentFactory.remove(filePath);
      expect(await documentFactory.exists(filePath)).toBe(false);
    });

    it("should remove a directory recursively", async () => {
      await documentFactory.remove(tempDir);
      expect(await documentFactory.exists(tempDir)).toBe(false);
    });

    it("should throw error when path doesn't exist", async () => {
      await expect(
        documentFactory.remove(path.join(tempDir, "nonexistent"))
      ).rejects.toThrow();
    });
  });

  describe("isAbsolute", () => {
    it("should return true for absolute path", () => {
      expect(documentFactory.isAbsolute(MOCK_PATH)).toBe(true);
    });

    it("should return false for relative path", () => {
      expect(documentFactory.isAbsolute(path.join("file1.ts"))).toBe(false);
    });

    it("should return false for non-existent path", () => {
      expect(documentFactory.isAbsolute("nonexistent")).toBe(false);
    });
  });

  describe("extension", () => {
    it("should return extension for file", () => {
      expect(documentFactory.extension("file1.ts")).toBe(".ts");
    });

    it("should return empty string for directory", () => {
      expect(documentFactory.extension("directory")).toBe("");
    });

    it("should return empty string for non-existent file", () => {
      expect(documentFactory.extension("nonexistent")).toBe("");
    });

    it("should return extension for file without two . characters", () => {
      expect(documentFactory.extension("file1.test.ts")).toBe(".ts");
    });
  });

  describe("copy", () => {
    const tempDir = path.join(MOCK_PATH, "temp_copy");

    beforeEach(async () => {
      await fs.mkdir(tempDir, { recursive: true });
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should copy a file", async () => {
      await documentFactory.copy(testFilePath, path.join(tempDir, "file1.ts"));
      expect(documentFactory.exists(path.join(tempDir, "file1.ts"))).toBe(true);
    });
  });

  describe("readFileSync", () => {
    const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
    beforeEach(async () => {
      await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
      await fs.writeFile(testFilePath, TEST_CONTENT);
    });

    afterEach(async () => {
      await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
    });

    it("should read file content synchronously with default options", () => {
      const content = documentFactory.readFileSync(testFilePath);
      expect(content).toBe(TEST_CONTENT);
    });

    it("should read file with custom encoding", () => {
      const content = documentFactory.readFileSync(testFilePath, {
        encoding: "utf8"
      });
      expect(content).toBe(TEST_CONTENT);
    });

    it("should throw error for non-existent file", () => {
      expect(() => documentFactory.readFileSync("nonexistent")).toThrow();
    });

    it("should throw error when reading directory", () => {
      expect(() => documentFactory.readFileSync(tempDir)).toThrow();
    });
  });

  describe("writeFile", () => {
    const tempDir = path.join(MOCK_PATH, "temp_write");
    const testFilePath = path.join(tempDir, "test.txt");
    beforeEach(async () => {
      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(testFilePath, TEST_CONTENT);
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should write content to file with default options", async () => {
      const newContent = "new content";
      const newFile = path.join(tempDir, "new.txt");

      await documentFactory.writeFile(newFile, newContent);
      const content = await fs.readFile(newFile, "utf8");
      expect(content).toBe(newContent);
    });

    it("should write content with custom encoding", async () => {
      const newContent = "новый контент"; // non-ASCII content
      const newFile = path.join(tempDir, "encoded.txt");

      await documentFactory.writeFile(newFile, newContent, {
        encoding: "utf8"
      });
      const content = await fs.readFile(newFile, "utf8");
      expect(content).toBe(newContent);
    });

    it("should overwrite existing file", async () => {
      const newContent = "overwritten content";
      await documentFactory.writeFile(testFilePath, newContent);
      const content = await fs.readFile(testFilePath, "utf8");
      expect(content).toBe(newContent);
    });

    it("should throw error when writing to a directory", async () => {
      await expect(
        documentFactory.writeFile(tempDir, "content")
      ).rejects.toThrow();
    });
  });

  describe("appendFile", () => {
    const tempDir = path.join(MOCK_PATH, "temp_append");
    const testFilePath = path.join(tempDir, "test.txt");
    beforeEach(async () => {
      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(testFilePath, TEST_CONTENT);
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should append content to existing file", async () => {
      const appendContent = " additional content";
      await documentFactory.appendFile(testFilePath, appendContent);
      const content = await fs.readFile(testFilePath, "utf8");
      expect(content).toBe(TEST_CONTENT + appendContent);
    });

    it("should create new file if it doesn't exist", async () => {
      const newFile = path.join(tempDir, "append.txt");
      await documentFactory.appendFile(newFile, TEST_CONTENT);
      const content = await fs.readFile(newFile, "utf8");
      expect(content).toBe(TEST_CONTENT);
    });

    it("should throw error when appending to a directory", async () => {
      await expect(
        documentFactory.appendFile(tempDir, "content")
      ).rejects.toThrow();
    });
  });

  describe("readDir", () => {
    const tempDir = path.join(MOCK_PATH, "temp_readdir");
    beforeEach(async () => {
      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(path.join(tempDir, "file1.txt"), "content1");
      await fs.writeFile(path.join(tempDir, "file2.txt"), "content2");
      await fs.mkdir(path.join(tempDir, "subdir"));
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should list directory contents", async () => {
      const contents = await documentFactory.readDir(tempDir);
      expect(contents).toHaveLength(3); // test.txt, file1.txt, file2.txt, subdir
      expect(contents).toContain("file1.txt");
      expect(contents).toContain("file2.txt");
      expect(contents).toContain("subdir");
    });

    it("should support withFileTypes option", async () => {
      const contents = await documentFactory.readDir(tempDir, {
        withFileTypes: true
      });
      expect(contents).toHaveLength(3);
    });

    it("should throw error for non-existent directory", async () => {
      await expect(documentFactory.readDir("nonexistent")).rejects.toThrow();
    });

    it("should throw error when reading a file as directory", async () => {
      await expect(documentFactory.readDir(testFilePath)).rejects.toThrow();
    });
  });

  describe("createDir", () => {
    const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
    beforeEach(async () => {
      await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
      await fs.writeFile(testFilePath, TEST_CONTENT);
    });

    afterEach(async () => {
      await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
    });

    it("should create new directory", async () => {
      const newDir = path.join(tempDir, "newdir");
      await documentFactory.createDir(newDir);
      expect(documentFactory.exists(newDir)).toBe(true);
    });

    it("should create nested directories with recursive option", async () => {
      const nestedDir = path.join(tempDir, "nested/deep/dir");
      await documentFactory.createDir(nestedDir, true);
      expect(documentFactory.exists(nestedDir)).toBe(true);
    });

    it("should throw error when creating directory with existing file path", async () => {
      await expect(documentFactory.createDir(testFilePath)).rejects.toThrow();
    });
  });

  describe("ensureDirectory", () => {
    it("should create directory if it doesn't exist", async () => {
      const newDir = path.join(tempDir, "ensure");
      await documentFactory.ensureDirectory(newDir);
      expect(documentFactory.exists(newDir)).toBe(true);
    });

    it("should not throw error if directory already exists", async () => {
      await expect(
        documentFactory.ensureDirectory(tempDir)
      ).resolves.not.toThrow();
    });

    it("should respect custom mode option", async () => {
      const newDir = path.join(tempDir, "mode-test");
      await documentFactory.ensureDirectory(newDir, { mode: 0o755 });
      const stats = await fs.stat(newDir);
      const expectedMode =
        process.platform === "win32" // on windows, the default mode is 0o666
          ? 0o666
          : 0o755;
      expect(stats.mode & 0o777).toBe(expectedMode);
    });
  });

  describe("baseName", () => {
    it("should return file name from path", () => {
      expect(documentFactory.baseName("/path/to/file.txt")).toBe("file.txt");
    });

    it("should return directory name from path", () => {
      expect(documentFactory.baseName("/path/to/dir/")).toBe("dir");
    });

    it("should handle paths with multiple extensions", () => {
      expect(documentFactory.baseName("/path/file.test.ts")).toBe(
        "file.test.ts"
      );
    });
  });

  describe("join", () => {
    it("should join path segments", () => {
      const joined = documentFactory.join("path", "to", "file.txt");
      expect(joined).toBe(path.join("path", "to", "file.txt"));
    });

    it("should handle absolute paths", () => {
      const joined = documentFactory.join("/root", "path", "file.txt");
      expect(joined).toBe(path.join("/root", "path", "file.txt"));
    });

    it("should normalize path separators", () => {
      const joined = documentFactory.join("path/to", "file.txt");
      expect(joined).toBe(path.join("path/to", "file.txt"));
    });
  });

  // Additional edge cases for existing methods
  describe("edge cases", () => {
    const tempDir = path.join(MOCK_PATH, "temp_edge");
    const testFilePath = path.join(tempDir, "test.txt");
    const symlink = path.join(tempDir, "symlink");

    beforeEach(async () => {
      await fs.mkdir(tempDir, { recursive: true });
      // Create the test file before creating the symlink
      await fs.writeFile(testFilePath, TEST_CONTENT);
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should handle symlinks when copying", async () => {
      await fs.symlink(testFilePath, symlink); // Create the symlink after the file exists
      const copyPath = path.join(tempDir, "copied-symlink");
      await documentFactory.copy(symlink, copyPath);
      expect(documentFactory.exists(copyPath)).toBe(true);
    });

    it("should handle empty directory copying", async () => {
      const emptyDir = path.join(tempDir, "empty");
      await fs.mkdir(emptyDir);
      const copyPath = path.join(tempDir, "copied-empty");
      await documentFactory.copy(emptyDir, copyPath);
      expect(documentFactory.exists(copyPath)).toBe(true);
    });

    it("should handle files with special characters", async () => {
      const specialFile = path.join(tempDir, "special$#@!.txt");
      await fs.writeFile(specialFile, "content");
      expect(documentFactory.exists(specialFile)).toBe(true);
      const stats = await fileStatsService(specialFile);
      expect(stats.isFile).toBe(true);
    });
  });

  // Test for line 33 (error handling in type method)
  describe("type error handling", () => {
    it("should handle system errors correctly", async () => {
      // Mock the entire fs module
      jest.mock("fs/promises", () => ({
        ...jest.requireActual("fs/promises"),
        stat: jest.fn().mockRejectedValue(new Error("System error"))
      }));

      await expect(documentFactory.type("/some/path")).rejects.toThrow(
        "Document error at /some/path: File not found"
      );
    });
  });

  describe("checkAccess", () => {
    it("should handle access check failures", async () => {
      const result = await documentFactory.checkAccess("/nonexistent/path");
      expect(result).toEqual({
        readable: false,
        writable: false,
        executable: false
      });
    });
  });

  // Test for line 337 (error handling in appendFile)
  describe("appendFile error handling", () => {
    it("should handle appendFile errors", async () => {
      const invalidPath = path.join(tempDir, "nonexistent", "test.txt");
      await expect(
        documentFactory.appendFile(invalidPath, "content")
      ).rejects.toThrow("Document error at");
    });
  });

  // Tests for lines 383-389 (directory copying edge cases)
  describe("copyDir edge cases", () => {
    const tempDir = path.join(MOCK_PATH, "temp_edge");
    const sourceDir = path.join(tempDir, "source");
    const targetDir = path.join(tempDir, "target");

    beforeEach(async () => {
      // Clean up before each test
      await fs.rm(tempDir, { recursive: true, force: true });
      await fs.mkdir(tempDir, { recursive: true });
    });

    afterEach(async () => {
      // Cleanup after each test
      await fs.rm(tempDir, { recursive: true, force: true });
    });

    it("should handle errors during directory creation while copying", async () => {
      // Create a source directory with content
      await fs.mkdir(sourceDir);
      await fs.writeFile(path.join(sourceDir, "test.txt"), TEST_CONTENT);

      // Mock ensureDirectory to simulate failure
      const originalEnsureDirectory = documentFactory.ensureDirectory;
      documentFactory.ensureDirectory = jest
        .fn()
        .mockRejectedValue(new Error("Permission denied"));

      await expect(
        documentFactory.copyDir(sourceDir, targetDir)
      ).rejects.toThrow();

      documentFactory.ensureDirectory = originalEnsureDirectory;
    });

    it("should handle nested directory structures correctly", async () => {
      const nestedDir = path.join(sourceDir, "nested");

      await fs.mkdir(sourceDir);
      await fs.mkdir(nestedDir);
      await fs.writeFile(path.join(sourceDir, "test1.txt"), "content1");
      await fs.writeFile(path.join(nestedDir, "test2.txt"), "content2");

      await documentFactory.copyDir(sourceDir, targetDir);

      expect(documentFactory.exists(path.join(targetDir, "test1.txt"))).toBe(
        true
      );
      expect(
        documentFactory.exists(path.join(targetDir, "nested", "test2.txt"))
      ).toBe(true);
    });
  });
});
