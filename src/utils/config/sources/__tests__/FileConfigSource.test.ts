import { JsonReader } from "../../../../infrastructure/filesystem/JsonReader";
import { logger } from "../../../../utils/logger";
import { DEFAULT_CONFIG, DEFAULT_NAME_PREFIX } from "../../schema/defaults";
import { IConfig } from "../../schema/types";
import { FileConfigSource } from "../../sources/FileConfigSource";

jest.mock("../../../../infrastructure/filesystem/JsonReader");
jest.mock("../../../../utils/logger", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn()
  }
}));

describe("FileConfigSource", () => {
  let fileConfigSource: FileConfigSource;
  const testFilePath = "test-config.json";
  const DEFAULT_NAME = "test-project";

  beforeEach(() => {
    jest.clearAllMocks();
    fileConfigSource = new FileConfigSource(testFilePath);
  });

  describe("constructor", () => {
    it("should initialize with correct priority", () => {
      expect(fileConfigSource.priority).toBe(1);
    });

    it("should set correct schema", () => {
      expect(fileConfigSource.schema).toBeDefined();
    });
  });

  describe("load", () => {
    it("should load and parse valid configuration file", async () => {
      const mockConfig: Partial<IConfig> = {
        name: DEFAULT_NAME,
        templatesDir: "templates"
      };

      (JsonReader.prototype.readJsonSync as jest.Mock).mockResolvedValue(
        mockConfig
      );

      const result = await fileConfigSource.load();
      expect(result.config?.name).toEqual(mockConfig.name);
      expect(result.config?.templatesDir).toEqual(mockConfig.templatesDir);
      expect(result.jobConfig).toEqual(undefined);
    });

    it("should handle invalid configuration gracefully", async () => {
      const invalidConfig = {
        name: 123, // Invalid type
        templatesDir: ["invalid"] // Invalid type
      };

      (JsonReader.prototype.readJsonSync as jest.Mock).mockResolvedValue(
        invalidConfig
      );

      const result = await fileConfigSource.load();
      expect(result.config?.name).toContain(DEFAULT_NAME_PREFIX);
      expect(logger.warn).toHaveBeenCalled();
    });

    it("should handle file read errors", async () => {
      (JsonReader.prototype.readJsonSync as jest.Mock).mockRejectedValue(
        new Error("File read error")
      );

      const result = await fileConfigSource.load();
      expect(result.config?.name).toContain(DEFAULT_NAME_PREFIX);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("Failed to load configuration from")
      );
    });
  });

  describe("error handling", () => {
    it("should return default configuration on validation failure", async () => {
      const invalidConfig = {
        logLevel: "INVALID_LEVEL"
      };

      (JsonReader.prototype.readJsonSync as jest.Mock).mockResolvedValue(
        invalidConfig
      );

      const result = await fileConfigSource.load();
      expect(result.config?.name).toContain(DEFAULT_NAME_PREFIX);
      expect(result.config?.logLevel).toEqual(DEFAULT_CONFIG.logLevel);
      expect(logger.warn).toHaveBeenCalled();
    });
  });
});
