import * as path from "path";
import * as fs from "fs/promises";

import { MOCK_PATH } from "../../__mocks__/mockFileSystem";
import { DocumentFactory } from "../DocumentFactory";
import { FileType } from "../../type";

describe("DocumentFactory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("type", () => {
    it('should return "file" for a file path', async () => {
      const result = await DocumentFactory.type(
        path.join(MOCK_PATH, "file1.ts")
      );
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
      const result = await DocumentFactory.size(
        path.join(MOCK_PATH, "file1.ts")
      );
      expect(result).toBe(29);
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
      const result = await DocumentFactory.size(
        path.join(MOCK_PATH, "empty.txt")
      );
      expect(result).toBe(0);
    });
  });
  describe("getStats", () => {
    it("should return complete file statistics", async () => {
      const stats = await DocumentFactory.getStats(
        path.join(MOCK_PATH, "file1.ts")
      );
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
          executable: expect.any(Boolean),
        },
      });
    });

    it("should return directory statistics", async () => {
      const stats = await DocumentFactory.getStats(MOCK_PATH);
      expect(stats).toMatchObject({
        size: expect.any(Number),
        isDirectory: true,
        isFile: false,
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
      const content = await DocumentFactory.readFile(
        path.join(MOCK_PATH, "file1.ts")
      );
      expect(content).toBeDefined();
      expect(content).toBeTruthy();
      expect(typeof content).toBe("string");
    });

    it("should read file with custom escoding", async () => {
      const content = await DocumentFactory.readFile(
        path.join(MOCK_PATH, "file1.ts"),
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
      contents.forEach((item) => {
        expect(item).toMatchObject({
          name: expect.any(String),
          type: expect.stringMatching(/^(file|directory)$/),
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
      const exists = DocumentFactory.exists(path.join(MOCK_PATH, "file1.ts"));
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
        path.join(MOCK_PATH, "file1.ts"),
        path.join(tempDir, "file1.ts")
      );
      expect(await DocumentFactory.exists(path.join(tempDir, "file1.ts"))).toBe(
        true
      );
    });
  });
});
