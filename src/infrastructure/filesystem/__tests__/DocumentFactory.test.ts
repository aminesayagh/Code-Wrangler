import * as path from "path";
import * as fs from "fs/promises";

import { DocumentFactory } from "../DocumentFactory";
import { FileType } from "../../../types/type";

describe("DocumentFactory", () => {
  const pwd = process.cwd();
  const MOCK_PATH = path.resolve(`${pwd}/__mocks__`);
  const tempDir = path.join(MOCK_PATH, "temp_test");
  const testFilePath = path.join(tempDir, "test.txt");
  const emptyFilePath = path.join(tempDir, "empty.txt");
  const testContent = "test content";

  beforeEach(async () => {
    jest.clearAllMocks();
    await fs.mkdir(MOCK_PATH, { recursive: true });
    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(testFilePath, testContent);
    await fs.writeFile(emptyFilePath, "");
  });

  afterEach(async () => {
    await fs.rm(MOCK_PATH, { recursive: true });
  });

  describe("type", () => {
    it('should return "file" for a file path', async () => {
      const result = await DocumentFactory.type(testFilePath);
      expect(result).toBe(FileType.File);
    });

    it('should return "directory" for a directory path', async () => {
      const result = await DocumentFactory.type(MOCK_PATH);
      expect(result).toBe(FileType.Directory);
    });

    it("should throw an error if the path doesn't exist", async () => {
      await expect(DocumentFactory.type("nonexistent")).rejects.toThrow(
        "Document error at nonexistent: File not found"
      );
    });

    it("should throw an error if the path is a file", async () => {
      await expect(
        DocumentFactory.type(path.join(MOCK_PATH, "file2.ts"))
      ).rejects.toThrow(
        `Document error at ${path.join(MOCK_PATH, "file2.ts")}: File not found`
      );
    });
  });

  describe("size", () => {
    it("should return the size of a file", async () => {
      const result = await DocumentFactory.size(testFilePath);
      expect(result).toStrictEqual(expect.any(Number));
    });

    it("should throw an error if the path doesn't exist", async () => {
      await expect(DocumentFactory.size("nonexistent")).rejects.toThrow(
        "Document error at nonexistent: File not found"
      );
    });

    it("should throw an error if the path is a directory", async () => {
      await expect(DocumentFactory.size(MOCK_PATH)).rejects.toThrow(
        `Document error at ${MOCK_PATH}: Path is a directory`
      );
    });

    it("should throw a zero size if the file is empty", async () => {
      const result = await DocumentFactory.size(emptyFilePath);
      expect(result).toBe(0);
    });
  });
  describe("getStats", () => {
    it("should return complete file statistics", async () => {
      const stats = await DocumentFactory.getStats(testFilePath);
      expect(stats).toMatchObject({
        size: expect.any(Number),
        created: expect.any(Object),
        modified: expect.any(Object),
        accessed: expect.any(Object),
        isDirectory: false,
        isFile: true,
        permissions: {
          readable: true,
          writable: expect.any(Boolean),
          executable: expect.any(Boolean)
        }
      });
    });

    it("should return directory statistics", async () => {
      const stats = await DocumentFactory.getStats(MOCK_PATH);
      expect(stats).toMatchObject({
        size: expect.any(Number),
        isDirectory: true,
        isFile: false
      });
    });

    it("should throw error for non-existent path", async () => {
      await expect(DocumentFactory.getStats("nonexistent")).rejects.toThrow(
        "Document error at nonexistent: File not found"
      );
    });
  });

  describe("readFile", () => {
    it("should read file content iwth default options", async () => {
      const content = await DocumentFactory.readFile(testFilePath);
      expect(content).toBeDefined();
      expect(content).toBeTruthy();
      expect(typeof content).toBe("string");
    });

    it("should read file with custom escoding", async () => {
      const content = await DocumentFactory.readFile(
        testFilePath,
        { encoding: "utf-8" }
      );
      expect(content).toBeDefined();
      expect(content).toBeTruthy();
      expect(typeof content).toBe("string");
    });

    it("should throw an error if the path doesn't exist", async () => {
      await expect(DocumentFactory.readFile("nonexistent")).rejects.toThrow(
        "Document error at nonexistent: File not found"
      );
    });

    it("should throw an error if the path is a directory", async () => {
      await expect(DocumentFactory.readFile(MOCK_PATH)).rejects.toThrow(
        `Document error at ${MOCK_PATH}: Error: EISDIR: illegal operation on a directory, read`
      );
    });
  });

  describe("readDirectory", () => {
    it("should return directory contents with type information", async () => {
      const contents = await DocumentFactory.readDirectory(MOCK_PATH);
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
        DocumentFactory.readDirectory("nonexistent")
      ).rejects.toThrow();
    });

    it("should throw error when trying to read a file as directory", async () => {
      await expect(
        DocumentFactory.readDirectory(path.join(MOCK_PATH, "file1.ts"))
      ).rejects.toThrow();
    });
  });

  describe("exists", () => {
    it("should return true for existing file", () => {
      const exists = DocumentFactory.exists(testFilePath);
      expect(exists).toBe(true);
    });

    it("should return true for existing directory", () => {
      const exists = DocumentFactory.exists(MOCK_PATH);
      expect(exists).toBe(true);
    });

    it("should return false for non-existent path", () => {
      const exists = DocumentFactory.exists("nonexistent");
      expect(exists).toBe(false);
    });
  });

  describe("remove", () => {
    const tempDir = path.join(MOCK_PATH, "temp_remove");

    beforeEach(async () => {
      // Create temp directory and test files
      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(path.join(tempDir, "test.txt"), "test content");
    });

    afterEach(async () => {
      // Cleanup
      if (await DocumentFactory.exists(tempDir)) {
        await fs.rm(tempDir, { recursive: true });
      }
    });

    it("should remove a file", async () => {
      const filePath = path.join(tempDir, "test.txt");
      await DocumentFactory.remove(filePath);
      expect(await DocumentFactory.exists(filePath)).toBe(false);
    });

    it("should remove a directory recursively", async () => {
      await DocumentFactory.remove(tempDir);
      expect(await DocumentFactory.exists(tempDir)).toBe(false);
    });

    it("should throw error when path doesn't exist", async () => {
      await expect(
        DocumentFactory.remove(path.join(tempDir, "nonexistent"))
      ).rejects.toThrow();
    });
  });

  describe("isAbsolute", () => {
    it("should return true for absolute path", () => {
      expect(DocumentFactory.isAbsolute(MOCK_PATH)).toBe(true);
    });

    it("should return false for relative path", () => {
      expect(DocumentFactory.isAbsolute(path.join("file1.ts"))).toBe(false);
    });

    it("should return false for non-existent path", () => {
      expect(DocumentFactory.isAbsolute("nonexistent")).toBe(false);
    });
  });

  describe("extension", () => {
    it("should return extension for file", () => {
      expect(DocumentFactory.extension("file1.ts")).toBe(".ts");
    });

    it("should return empty string for directory", () => {
      expect(DocumentFactory.extension("directory")).toBe("");
    });

    it("should return empty string for non-existent file", () => {
      expect(DocumentFactory.extension("nonexistent")).toBe("");
    });

    it("should return extension for file without two . characters", () => {
      expect(DocumentFactory.extension("file1.test.ts")).toBe(".ts");
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
      await DocumentFactory.copy(
        testFilePath,
        path.join(tempDir, "file1.ts")
      );
      expect(await DocumentFactory.exists(path.join(tempDir, "file1.ts"))).toBe(
        true
      );
    });
  });

  describe("readFileSync", () => {
    const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
    beforeEach(async () => {
      await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
      await fs.writeFile(testFilePath, testContent);
    });

    afterEach(async () => {
      await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
    });

    it("should read file content synchronously with default options", () => {
      const content = DocumentFactory.readFileSync(testFilePath);
      expect(content).toBe(testContent);
    });

    it("should read file with custom encoding", () => {
      const content = DocumentFactory.readFileSync(testFilePath, {
        encoding: "utf8"
      });
      expect(content).toBe(testContent);
    });

    it("should throw error for non-existent file", () => {
      expect(() => DocumentFactory.readFileSync("nonexistent")).toThrow();
    });

    it("should throw error when reading directory", () => {
      expect(() => DocumentFactory.readFileSync(tempDir)).toThrow();
    });
  });

  describe("writeFile", () => {
    const tempDir = path.join(MOCK_PATH, "temp_write");
    const testFilePath = path.join(tempDir, "test.txt");
    beforeEach(async () => {
      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(testFilePath, testContent);
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should write content to file with default options", async () => {
      const newContent = "new content";
      const newFile = path.join(tempDir, "new.txt");

      await DocumentFactory.writeFile(newFile, newContent);
      const content = await fs.readFile(newFile, "utf8");
      expect(content).toBe(newContent);
    });

    it("should write content with custom encoding", async () => {
      const newContent = "новый контент"; // non-ASCII content
      const newFile = path.join(tempDir, "encoded.txt");

      await DocumentFactory.writeFile(newFile, newContent, {
        encoding: "utf8"
      });
      const content = await fs.readFile(newFile, "utf8");
      expect(content).toBe(newContent);
    });

    it("should overwrite existing file", async () => {
      const newContent = "overwritten content";
      await DocumentFactory.writeFile(testFilePath, newContent);
      const content = await fs.readFile(testFilePath, "utf8");
      expect(content).toBe(newContent);
    });

    it("should throw error when writing to a directory", async () => {
      await expect(
        DocumentFactory.writeFile(tempDir, "content")
      ).rejects.toThrow();
    });
  });

  describe("appendFile", () => {
    const tempDir = path.join(MOCK_PATH, "temp_append");
    const testFilePath = path.join(tempDir, "test.txt");
    beforeEach(async () => {
      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(testFilePath, testContent);
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should append content to existing file", async () => {
      const appendContent = " additional content";
      await DocumentFactory.appendFile(testFilePath, appendContent);
      const content = await fs.readFile(testFilePath, "utf8");
      expect(content).toBe(testContent + appendContent);
    });

    it("should create new file if it doesn't exist", async () => {
      const newFile = path.join(tempDir, "append.txt");
      await DocumentFactory.appendFile(newFile, testContent);
      const content = await fs.readFile(newFile, "utf8");
      expect(content).toBe(testContent);
    });

    it("should throw error when appending to a directory", async () => {
      await expect(
        DocumentFactory.appendFile(tempDir, "content")
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
      const contents = await DocumentFactory.readDir(tempDir);
      expect(contents).toHaveLength(3); // test.txt, file1.txt, file2.txt, subdir
      expect(contents).toContain("file1.txt");
      expect(contents).toContain("file2.txt");
      expect(contents).toContain("subdir");
    });

    it("should support withFileTypes option", async () => {
      const contents = await DocumentFactory.readDir(tempDir, {
        withFileTypes: true
      });
      expect(contents).toHaveLength(3);
    });

    it("should throw error for non-existent directory", async () => {
      await expect(DocumentFactory.readDir("nonexistent")).rejects.toThrow();
    });

    it("should throw error when reading a file as directory", async () => {
      await expect(DocumentFactory.readDir(testFilePath)).rejects.toThrow();
    });
  });

  describe("createDir", () => {
    const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
    beforeEach(async () => {
      await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
      await fs.writeFile(testFilePath, testContent);
    });

    afterEach(async () => {
      await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
    });

    it("should create new directory", async () => {
      const newDir = path.join(tempDir, "newdir");
      await DocumentFactory.createDir(newDir);
      expect(await DocumentFactory.exists(newDir)).toBe(true);
    });

    it("should create nested directories with recursive option", async () => {
      const nestedDir = path.join(tempDir, "nested/deep/dir");
      await DocumentFactory.createDir(nestedDir, true);
      expect(await DocumentFactory.exists(nestedDir)).toBe(true);
    });

    it("should throw error when creating directory with existing file path", async () => {
      await expect(DocumentFactory.createDir(testFilePath)).rejects.toThrow();
    });
  });

  describe("ensureDirectory", () => {
    it("should create directory if it doesn't exist", async () => {
      const newDir = path.join(tempDir, "ensure");
      await DocumentFactory.ensureDirectory(newDir);
      expect(await DocumentFactory.exists(newDir)).toBe(true);
    });

    it("should not throw error if directory already exists", async () => {
      await expect(
        DocumentFactory.ensureDirectory(tempDir)
      ).resolves.not.toThrow();
    });

    it("should respect custom mode option", async () => {
      const newDir = path.join(tempDir, "mode-test");
      await DocumentFactory.ensureDirectory(newDir, { mode: 0o755 });
      const stats = await fs.stat(newDir);
      expect(stats.mode & 0o777).toBe(0o755);
    });
  });

  describe("baseName", () => {
    it("should return file name from path", () => {
      expect(DocumentFactory.baseName("/path/to/file.txt")).toBe("file.txt");
    });

    it("should return directory name from path", () => {
      expect(DocumentFactory.baseName("/path/to/dir/")).toBe("dir");
    });

    it("should handle paths with multiple extensions", () => {
      expect(DocumentFactory.baseName("/path/file.test.ts")).toBe(
        "file.test.ts"
      );
    });
  });

  describe("join", () => {
    it("should join path segments", () => {
      const joined = DocumentFactory.join("path", "to", "file.txt");
      expect(joined).toBe(path.join("path", "to", "file.txt"));
    });

    it("should handle absolute paths", () => {
      const joined = DocumentFactory.join("/root", "path", "file.txt");
      expect(joined).toBe(path.join("/root", "path", "file.txt"));
    });

    it("should normalize path separators", () => {
      const joined = DocumentFactory.join("path/to", "file.txt");
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
      await fs.writeFile(testFilePath, "test content");
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should handle symlinks when copying", async () => {
      await fs.symlink(testFilePath, symlink); // Create the symlink after the file exists
      const copyPath = path.join(tempDir, "copied-symlink");
      await DocumentFactory.copy(symlink, copyPath);
      expect(await DocumentFactory.exists(copyPath)).toBe(true);
    });

    it("should handle empty directory copying", async () => {
      const emptyDir = path.join(tempDir, "empty");
      await fs.mkdir(emptyDir);
      const copyPath = path.join(tempDir, "copied-empty");
      await DocumentFactory.copy(emptyDir, copyPath);
      expect(await DocumentFactory.exists(copyPath)).toBe(true);
    });

    it("should handle files with special characters", async () => {
      const specialFile = path.join(tempDir, "special$#@!.txt");
      await fs.writeFile(specialFile, "content");
      expect(await DocumentFactory.exists(specialFile)).toBe(true);
      const stats = await DocumentFactory.getStats(specialFile);
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

      await expect(DocumentFactory.type("/some/path")).rejects.toThrow(
        "Document error at /some/path: File not found"
      );
    });
  });

  describe("checkAccess", () => {
    it("should handle access check failures", async () => {
      const result = await DocumentFactory.checkAccess("/nonexistent/path");
      expect(result).toEqual({
        readable: false,
        writable: false,
        executable: false
      });
    });
  });

  // Tests for lines 137-159 (readJsonSync method)
  describe("readJsonSync", () => {
    const jsonFilePath = path.join(tempDir, "test.json");

    beforeEach(async () => {
      await fs.writeFile(jsonFilePath, JSON.stringify({ key: "value" }));
    });

    it("should successfully read and parse JSON file", async () => {
      const result = await DocumentFactory.readJsonSync(jsonFilePath);
      expect(result).toEqual({ key: "value" });
    });

    it("should throw error for non-existent file", async () => {
      await expect(
        DocumentFactory.readJsonSync("/nonexistent.json")
      ).rejects.toThrow(
        "Document error at /nonexistent.json: Error: File not found: /nonexistent.json"
      );
    });

    it("should throw error for empty file", async () => {
      await fs.writeFile(jsonFilePath, "");
      await expect(DocumentFactory.readJsonSync(jsonFilePath)).rejects.toThrow(
        `File is empty: ${jsonFilePath}`
      );
    });

    it("should throw error for invalid JSON", async () => {
      await fs.writeFile(jsonFilePath, "invalid json");
      await expect(DocumentFactory.readJsonSync(jsonFilePath)).rejects.toThrow(
        `Invalid JSON in file ${jsonFilePath}`
      );
    });
  });

  // Test for line 337 (error handling in appendFile)
  describe("appendFile error handling", () => {
    it("should handle appendFile errors", async () => {
      const invalidPath = path.join(tempDir, "nonexistent", "test.txt");
      await expect(
        DocumentFactory.appendFile(invalidPath, "content")
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
      await fs.writeFile(path.join(sourceDir, "test.txt"), "test content");

      // Mock ensureDirectory to simulate failure
      const originalEnsureDirectory = DocumentFactory.ensureDirectory;
      DocumentFactory.ensureDirectory = jest
        .fn()
        .mockRejectedValue(new Error("Permission denied"));

      await expect(
        DocumentFactory.copyDir(sourceDir, targetDir)
      ).rejects.toThrow();

      DocumentFactory.ensureDirectory = originalEnsureDirectory;
    });

    it("should handle nested directory structures correctly", async () => {
      const nestedDir = path.join(sourceDir, "nested");

      await fs.mkdir(sourceDir);
      await fs.mkdir(nestedDir);
      await fs.writeFile(path.join(sourceDir, "test1.txt"), "content1");
      await fs.writeFile(path.join(nestedDir, "test2.txt"), "content2");

      await DocumentFactory.copyDir(sourceDir, targetDir);

      expect(
        await DocumentFactory.exists(path.join(targetDir, "test1.txt"))
      ).toBe(true);
      expect(
        await DocumentFactory.exists(
          path.join(targetDir, "nested", "test2.txt")
        )
      ).toBe(true);
    });
  });
});
