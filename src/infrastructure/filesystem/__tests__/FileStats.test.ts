import * as fs from "fs/promises";
import * as path from "path";

import { fileStatsService } from "../FileStats";

describe("FileStatsService", () => {
  const pwd = process.cwd();
  const MOCK_PATH = path.resolve(
    `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/stats`
  );
  const TEST_CONTENT = "test content";
  const testFilePath = path.join(MOCK_PATH, "test.txt");

  beforeEach(async () => {
    await fs.mkdir(MOCK_PATH, { recursive: true });
    await fs.writeFile(testFilePath, TEST_CONTENT);
  });

  afterEach(async () => {
    await fs.rm(MOCK_PATH, { recursive: true });
  });

  describe("getStats", () => {
    it("should return complete file statistics", async () => {
      const stats = await fileStatsService(testFilePath);
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
      const stats = await fileStatsService(MOCK_PATH);
      expect(stats).toMatchObject({
        size: expect.any(Number),
        isDirectory: true,
        isFile: false
      });
    });

    it("should throw error for non-existent path", async () => {
      await expect(fileStatsService("nonexistent")).rejects.toThrow(
        "Document error at nonexistent: File not found"
      );
    });
  });
});
