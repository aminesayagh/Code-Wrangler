import * as fs from "fs/promises";
import * as path from "path";

import { jsonReader } from "../JsonReader";

describe("jsonReader", () => {
  const pwd = process.cwd();
  const MOCK_PATH = path.resolve(
    `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/json`
  );
  const TEST_CONTENT = JSON.stringify({ key: "value" });
  const TEST_FILE_NAME = "test.json";

  beforeEach(async () => {
    await fs.mkdir(MOCK_PATH, { recursive: true });
    await fs.writeFile(path.join(MOCK_PATH, TEST_FILE_NAME), TEST_CONTENT);
  });

  afterEach(async () => {
    await fs.rm(MOCK_PATH, { recursive: true });
  });

  describe("readJsonSync", () => {
    const jsonFilePath = path.join(MOCK_PATH, TEST_FILE_NAME);

    it("should successfully read and parse JSON file", async () => {
      const result = await jsonReader(jsonFilePath);
      expect(result).toEqual({ key: "value" });
    });

    it("should throw error for non-existent file", async () => {
      await expect(jsonReader("/nonexistent.json")).rejects.toThrow(
        `Document error at /nonexistent.json: File not found`
      );
    });
  });
});
