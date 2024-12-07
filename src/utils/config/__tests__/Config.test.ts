import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
import { JsonReader } from "../../../infrastructure/filesystem/JsonReader";
import { logger } from "../../logger/Logger";
import { Config } from "../Config";
import { DEFAULT_CONFIG } from "../schema";

jest.mock("../../../infrastructure/filesystem/DocumentFactory");
jest.mock("../../logger/Logger", () => ({
  logger: {
    error: jest.fn(),
    setConfig: jest.fn(),
    setLogLevel: jest.fn()
  },
  LOG_VALUES: ["ERROR", "WARN", "INFO", "DEBUG"]
}));
jest.mock("../../../infrastructure/filesystem/JsonReader");

describe("Config", () => {
  let config: Config;
  const TEST_OUTPUT_FILE = "new-output";

  beforeEach(async () => {
    // Reset all mocks
    jest.clearAllMocks();
    jest.mocked(JsonReader).mockImplementation(
      () =>
        ({
          readJsonSync: jest.fn().mockResolvedValue({}),
          readFileContent: jest.fn(),
          parseJsonContent: jest.fn(),
          validatePath: jest.fn()
        }) as unknown as JsonReader
    );
    (documentFactory.resolve as jest.Mock).mockReturnValue(
      "/test/codewrangler.json"
    );

    // Destroy singleton instance before each test
    Config.destroy();
    config = await Config.load();
  });

  describe("Singleton", () => {
    it("maintains single instance", async () => {
      const instance1 = await Config.load();
      const instance2 = await Config.load();
      expect(instance1).toBe(instance2);
    });

    it("creates new instance after destroy", async () => {
      const instance1 = await Config.load();
      Config.destroy();
      const instance2 = await Config.load();
      expect(instance1).not.toBe(instance2);
    });
  });

  describe("Configuration Loading", () => {
    it("loads default config when no user config exists", async () => {
      jest.mocked(JsonReader).mockImplementation(
        () =>
          ({
            readJsonSync: jest.fn(),
            resolve: jest.fn(),
            validatePath: jest.fn(),
            readFileContent: jest.fn(),
            parseJsonContent: jest.fn()
          }) as unknown as JsonReader
      );

      Config.destroy();

      const newConfig = await Config.load();
      expect(newConfig.getAll()).toEqual(DEFAULT_CONFIG);
    });

    it("loads and merges user config with defaults", async () => {
      const userConfig = {
        outputFile: TEST_OUTPUT_FILE,
        logLevel: "DEBUG" as const
      };

      jest.mocked(JsonReader).mockImplementation(
        () =>
          ({
            readJsonSync: jest.fn().mockResolvedValue(userConfig),
            resolve: jest.fn(),
            validatePath: jest.fn(),
            readFileContent: jest.fn(),
            parseJsonContent: jest.fn()
          }) as unknown as JsonReader
      );

      Config.destroy();
      const newConfig = await Config.load();
      expect(newConfig.get("outputFile")).toBe(TEST_OUTPUT_FILE);
      expect(newConfig.get("logLevel")).toBe("DEBUG");
    });

    it("handles invalid JSON config", async () => {
      jest.mocked(JsonReader).mockImplementation(
        () =>
          ({
            readJsonSync: jest
              .fn()
              .mockRejectedValue(new Error("Invalid JSON")),
            resolve: jest.fn(),
            validatePath: jest.fn(),
            readFileContent: jest.fn(),
            parseJsonContent: jest.fn()
          }) as unknown as JsonReader
      );

      Config.destroy();
      await expect(Config.load()).rejects.toThrow();
    });

    it("validates merged configuration", async () => {
      const invalidConfig = {
        maxFileSize: -1
      };

      jest.mocked(JsonReader).mockImplementation(
        () =>
          ({
            readJsonSync: jest.fn().mockResolvedValue(invalidConfig),
            resolve: jest.fn(),
            validatePath: jest.fn(),
            readFileContent: jest.fn(),
            parseJsonContent: jest.fn()
          }) as unknown as JsonReader
      );

      Config.destroy();
      await expect(Config.load()).rejects.toThrow(
        "Configuration validation failed"
      );
    });
  });

  describe("Configuration Operations", () => {
    it("gets configuration values", () => {
      expect(config.get("dir")).toBe(DEFAULT_CONFIG.dir);
      expect(config.get("pattern")).toBe(DEFAULT_CONFIG.pattern);
    });

    it("sets configuration values", () => {
      config.set("outputFile", TEST_OUTPUT_FILE);
      expect(config.get("outputFile")).toBe(TEST_OUTPUT_FILE);
    });

    it("validates on set", () => {
      expect(() => config.set("maxFileSize", -1)).toThrow();
      expect(logger.error).toHaveBeenCalled();
    });

    it("overrides multiple values", () => {
      const overrides = {
        outputFile: TEST_OUTPUT_FILE,
        logLevel: "DEBUG" as const
      };
      config.override(overrides);
      expect(config.get("outputFile")).toBe(TEST_OUTPUT_FILE);
      expect(config.get("logLevel")).toBe("DEBUG");
    });

    it("resets to defaults", () => {
      config.set("outputFile", TEST_OUTPUT_FILE);
      config.reset();
      expect(config.getAll()).toEqual(DEFAULT_CONFIG);
    });
  });
});
